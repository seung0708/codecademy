








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

const checkout = async (req, res, next) => {
    const {id} = req.params; 
    const {amountToPay, method, expiration} = req.body;
    const userId = req.user.id; 
    const user = await findUserById(userId); 

    if (user.id !== userId) {
        return res.status(401).json({message: "You you must be signed in to view this page"})
    }

    const cart = await pool.query(`
        SELECT * 
        FROM cart
        WHERE id = $1 AND user_id = $2
        `,[id, userId])

    if (cart.rows.length === 0) {
        return res.status(401).json({message: "Cart doesn't exist for this user"})
    }

    const cartItems = await pool.query(`
        SELECT c.cart_id, c.product_id, p.category_id, p.name, p.description, p.price, p.stock_quantity, c.quantity
        FROM cart_items c
        JOIN products p
            ON c.product_id = p.id
        WHERE cart_id = $1 AND p.stock_quantity > 0
        `, [id])

    //console.log('cartItems', cartItems.rows)
    
    if (cartItems.rows === 0) {
        return res.status(401).status({message: "There are not items in this cart"})
    }

    cartItems.rows.find( async (cartItem) => {
        if (cartItem.stock_quantity <= 10 && cartItem.stock_quantity > 1) {
            res.json({message: `There are only ${cartItem.stock_quantity} left in stock for ${cartItem.name}`})
        } 
        if (cartItem.stock_quantity < 1) {
            await pool.query(`
                DELETE FROM cart_items 
                WHERE product_id = $1
                `, [cartItem.product_id])
            res.json({message: `${cartItem.name} is out of stock`})
        }
    })

    const total = cartItems.rows.reduce((acc, current) => acc + (current.quantity * current.price), 0) 
    console.log(total)

    try {
        if (method === "credit card" || method === "debit card") {
            await pool.query(`
                INSERT INTO payment_methods (user_id, method_type, expiry_date) 
                VALUES($1, $2, TO_DATE($3, 'MM/YYYY'))
                `,[userId, method, expiration])
        } else {
            await pool.query(`
                INSERT INTO payment_methods (user_id, method_type)
                VALUES($1, $2)
                `, [userId, method])
        }

        const paymentMethods = await pool.query(`
            SELECT id, user_id, method_type, TO_CHAR(expiry_date, 'MM/YYYY')
            FROM payment_methods
            WHERE user_id = $1
            `,[userId]
        )

        const payments = await pool.query(`
            INSERT INTO payments(user_id, amount, payment_method_id, status)
            VALUES ($1, $2, $3, 'pending')
            RETURNING *
            `,[userId, amountToPay, paymentMethods.rows[0].id])

        const {amount, id } = payments.rows[0]

        if (amount < total) {
            await pool.query(`
                UPDATE payments
                SET status = 'failed'
                WHERE id = $1
                `,[id])
        }

        if (Number(amount) === total) {
            const paymentCompleted = await pool.query(`
                UPDATE payments
                SET status = 'completed'
                WHERE id = $1
                RETURNING *
                `, [id])

            if (paymentCompleted.rows[0].status === 'completed') {
                const order = await pool.query(`
                INSERT INTO orders (user_id, total_amount, payment_id)
                VALUES ($1, $2, $3)
                RETURNING *
                `, [userId, amount, paymentCompleted.rows[0].id])
                
                cartItems.rows.forEach( async (cartItem) => {
                    await pool.query(`
                        INSERT INTO order_items(order_id, product_id, quantity, price)
                        VALUES ($1, $2, $3, $4)
                    `,[order.rows[0].id, cartItem.product_id, cartItem.quantity, cartItem.price])
                })
            }

        }

        const fullOrder = await pool.query(`
            SELECT o.id, o.user_id, o.total_amount, o.payment_id, ot.product_id, ot.price 
            FROM orders o
            JOIN order_items ot
                ON o.id = ot.order_id 
            WHERE o.user_id = $1
            `, [userId])
        console.log('full order', fullOrder.rows)

        if (fullOrder.rows.length > 0) {
            await pool.query(`
                DELETE FROM cart
                WHERE id = $1
                `, [cart.rows[0].id])
            return res.status(200).json(fullOrder.rows)
        }

    } catch (error) {
        console.log(error)
    }

}

const getAllOrders = async (req, res, next) => {
    const userId = req.user.id
    const orders = await pool.query(`
        SELECT o.id, o.user_id, o.total_amount, o.payment_id, ot.product_id, ot.price 
        FROM orders o
        JOIN order_items ot
            ON o.id = ot.order_id 
        WHERE o.user_id = $1
        `, [userId])

    if (orders.rows.length > 0) {
        res.status(200).json(orders.rows)
    }
}

const getOrderById = async (req, res, next) => {
    const userId = req.user.id 
    const {id} = req.params;
    const order = await pool.query(`
        SELECT o.id, o.user_id, o.total_amount, o.payment_id, ot.product_id, ot.price 
        FROM orders o
        JOIN order_items ot
            ON o.id = ot.order_id 
        WHERE o.user_id = $1 and o.id = $2
        `,[userId, id]
    )

    if (order.rows[0]) {
        res.status(200).json(order.rows[0])
    }
}


module.exports = {
    register,
    login,
    getUserByEmail,
    findUserById,
    getUserById,
    updateUser,
    deleteUser,
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getCart,
    addItemToCart,
    updateCartItemQuantity, 
    deleteCart, 
    checkout,
    getAllOrders, 
    getOrderById

}