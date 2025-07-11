const pool = require('../utils/pool')

const getCart = async (req, res, next) => {
    const {id} = req.params;
    const userId = req.user.id
    
    const user = await findUserById(userId)

    if(user.id !== userId) {
        return res.status(401).json({message: "Please sign in to view your cart"});
    }

    const cart = await pool.query(`
        SELECT * 
        FROM cart
        WHERE id = $1
        `, [id]
    );

    if(cart.rows.length === 0) {
        return res.status(401).json({message: "You don't have any items in your cart. "})
    }

    const cartItems = await pool.query(`
        SELECT c.cart_id, p.category_id, p.name, p.description, p.price, c.quantity
        FROM cart_items c
        JOIN products p
            ON c.product_id = p.id
        WHERE cart_id = $1
        `, [id]
    )

    if (cartItems.rows.length > 0) {
        return res.status(200).json(cartItems.rows)
    }

}

const addItemToCart = async (req, res, next) => {
    const {productId, quantity} = req.body; 
    const userId = req.user.id; 

    const user = await findUserById(userId)

    if (user.id !== userId) {
        return res.status(401).json({message: "You are not authorized. Please sign in"}); 
    }

    const product = await pool.query(`
        SELECT * 
        FROM products
        WHERE id = $1
        `, [productId]
    )

    if (!product.rows[0]) {
        return res.status(204).json({message: "Item not found"});
    }

    const cartExists = await pool.query(`
        SELECT * 
        FROM cart
        WHERE user_id = $1
        `, [userId]
    )

    const cartItemExists = await pool.query(`
        SELECT * 
        FROM cart_items 
        WHERE product_id = $1
        `, [productId]
    )

    try {
        if (cartExists.rows.length > 0) {
            if (cartItemExists.rows.length > 0) {
                await pool.query(`
                    UPDATE cart_items
                    SET quantity = quantity + $1
                    WHERE cart_id = $2 AND product_id = $3
                    `, [quantity, cartExists.rows[0]?.id, productId]
                )
    
            } else {
                await pool.query(`
                    INSERT INTO cart_items (cart_id, product_id, quantity)
                    VALUES ($1, $2, $3)
                    `,[cartExists.rows[0].id, productId, quantity]
                )
            }
        } else {
            const cart = await pool.query(`
                INSERT INTO cart (user_id)
                VALUES ($1)
                RETURNING *
                `, [userId]
            )
            await pool.query(`
                INSERT INTO cart_items (cart_id, product_id, quantity)
                VALUES ($1, $2, $3)
                `, [cart.rows[0].id, productId, quantity]
            )
        }

        const cart = await pool.query(`
            SELECT * 
            FROM cart
            WHERE user_id = $1
            `,[userId]
        )


        const newCartItems = await pool.query(`
            SELECT c.cart_id, p.category_id, p.name, p.description, p.price, c.quantity
            FROM cart_items c
            JOIN products p
                ON c.product_id = p.id
            WHERE cart_id = $1
            `, [cart.rows[0].id]
        )

        return res.status(200).json(newCartItems.rows)

    } catch(error) {
        console.error(error)
    }
}

const updateCartItemQuantity = async (req, res, next) => {
    //cart id
    const {id} = req.params; 
    const userId = req.user.id; 
    const {productId, quantity, action} = req.body
    console.log(productId, quantity, quantity === 0)
    const user = await findUserById(userId)

    if(user.id !== userId) {
        return res.status(401).json({message: "Please sign in to view your cart"});
    }

    const cartItems = await pool.query(`
        SELECT c.cart_id, c.product_id, p.category_id, p.name, p.description, p.price, c.quantity
        FROM cart_items c
        JOIN products p
            ON c.product_id = p.id
        WHERE cart_id = $1
        `, [id]
    )

    if (cartItems.rows.length === 0) {
        await pool.query(`
            DELETE FROM cart
            WHERE id = $1
            `,[cartItems.rows[0].cart_id]
        )

        return res.status(200).json({message: "No items in the cart."})
    }

    const itemToUpdate = cartItems.rows.find(cartItem => cartItem.product_id === productId)
    
    if (quantity === 0) {
        await pool.query(`
            DELETE FROM cart_items
            WHERE product_id = $1
            `,[itemToUpdate.product_id]
        )
    }
    
    if (quantity) {
        await pool.query(`
            UPDATE cart_items
            SET quantity = quantity + $1
            WHERE product_id = $2
            RETURNING *
            `,[quantity, itemToUpdate.product_id]
        )
    }

    if (action) {
        if (action === 'increment') {
            await pool.query(`
                UPDATE cart_items
                SET quantity = quantity + 1
                WHERE product_id = $1
                `, [itemToUpdate.product_id]
            )

        } else if (action === 'decrement') {
            const updatedItem = await pool.query(`
                UPDATE cart_items
                SET quantity = quantity - 1 
                WHERE product_id = $1
                RETURNING *
                `, [itemToUpdate.product_id]
            )

            if (updatedItem.rows[0].quantity < 1) {
                await pool.query(`
                    DELETE FROM cart_items
                    WHERE product_id = $1
                    `,[itemToUpdate.product_id]
                )
                
            }
        }
    }

    const newCartItems = await pool.query(`
        SELECT c.cart_id, p.category_id, p.name, p.description, p.price, c.quantity
        FROM cart_items c
        JOIN products p
            ON c.product_id = p.id
        WHERE cart_id = $1
        `, [id]
    )

    res.status(200).json(newCartItems.rows)
}

const deleteCart = async (req, res, next) => {
    const {id} = req.params; 
    const userId = req.user.id; 
    const user = await findUserById(userId); 

    if (user.id !== userId) {
        return res.status(401).status({message: "Please sign in to view cart"})
    }

    await pool.query(`
        DELETE FROM cart
        WHERE id = $1
        `,[id])

    res.status(200).json({message: "cart successfully deleted"})
}

module.exports = {
    getCart, 
    addItemToCart, 
    updateCartItemQuantity, 
    deleteCart

}