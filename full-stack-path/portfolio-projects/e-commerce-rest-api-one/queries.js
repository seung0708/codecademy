const Pool = require('pg').Pool;
const jwt = require('jsonwebtoken');
const {passwordHash, validatePassword, checkUserAccess} = require('./utilities');

const pool = new Pool({
    user: process.env.DB_USER, 
    host: 'localhost', 
    database: process.env.DB_NAME, 
    password: process.env.DB_PASSWORD, 
    port: 5432
})

const register = async (request, response) => {
    const {firstName, lastName, email, password} = request.body;

    const users = await pool.query(`
        SELECT * 
        FROM users
        WHERE email = $1
    `, [email])

    if (users.rows[0]) {
        response.status(409).json({message: 'Email already exists'})
    }

    const hashedPassword = await passwordHash(password);

    try {
        pool.query(`
            INSERT INTO users (first_name, last_name, email, password)
            VALUES ($1, $2, $3, $4)
            `,[firstName, lastName, email, hashedPassword], 
            (error, results) => {
                if(error) {
                    console.log(error)
                }
                response.status(200).json(results)
            }
        )
    } catch(error) {
        console.log(error)
    }
    
    
}

const login = async (request, response) => {
    const {email, password} = request.body; 
    const result = await pool.query(`
        SELECT *
        FROM users 
        WHERE email = $1
        `, [email]
    )
    const user = result.rows[0]
    const isValidPassword = await validatePassword(password, user.password);

    if(!isValidPassword) {
        return response.status(401).json({message: 'Invalid email or password'});
    }
    
    const token = jwt.sign(
        {id: user.id, email: user.email},
        process.env.JWT_SECRET_KEY, 
        {expiresIn: '1h'}
    )
    
    response.status(200).json({message: 'Login successful', token})
}

//used for passport authentication
const getUserByEmail = async (email) => {
    const result = await pool.query(`
        SELECT *
        FROM users
        WHERE email = $1
        `,[email]
    )
    console.log(result.rows)
    return result.rows[0]
}

//used for passport authentication
const findUserById = async (id) => {
    //console.log(id)
    const result = await pool.query(`
        SELECT * 
        FROM users
        WHERE id = $1
        `, [id]
    )
    return result.rows[0]
}

const getUserById = async (req, res) => {
    const isUserLoggedIn = checkUserAccess(req.params.id, req.user.id);

    if(!isUserLoggedIn) {
        return res.status(403).json({message: 'You are not authorized to edit this account'})
    }

    try { 
        const results = await pool.query(`
            SELECT * 
            FROM users 
            WHERE id = $1`, 
            [id]
        )

        if (results.rows.length === 0) {
            return res.status(404).json({message: 'User not found'})
        }

        return res.status(200).json(results.rows)

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server error'})
    }
}

const updateUser = async(req, res) => {
    const updates = req.body;

    const isUserLoggedIn = checkUserAccess(req.params.id, req.user.id);

    if(!isUserLoggedIn) {
        return res.status(403).json({message: 'You are not authorized to edit this account'})
    }

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'No fields provided to update' });
    }

    const setClauses = [];
    const values = [];

    let i = 1; 
    for (const key in updates) {
        setClauses.push(`${key} = $${i}`);
        values.push(updates[key]);
        i++;
    }

    values.push(id);

    const query = `
    UPDATE users
    SET ${setClauses.join(', ')}
    WHERE id = $${i}
    RETURNING *;
  `;

    try {
        const result = await pool.query(query, values)
         if(result.rows.length === 0) {
            return res.status(404).json({error: 'User not found'});
        }
        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error(error); 
        res.status(500).json({error: 'Database updated failed'});
    }
}

const deleteUser = async (req, res) => {
    const isUserLoggedIn = checkUserAccess(req.params.id, req.user.id);

    if(!isUserLoggedIn) {
        return res.status(403).json({message: 'You are not authorized to edit this account'})
    }

    await pool.query(`
        DELETE 
        FROM users
        WHERE id = $1
        `, [id]
    )

    res.status(200)

}

const getAllProducts = async (request, response) => {
    const products = await pool.query(`
        SELECT p.name, p.description, c.name AS category, p.price 
        FROM products p
        JOIN categories c 
            ON p.category_id = c.id 
        `
    )
    response.status(200).json(products.rows)
}

const getProductById = async (req, res) => {
    const {id} = req.params
    const result = await pool.query(`
        SELECT p.name, p.description, c.name AS category, p.price 
        FROM products p
        JOIN categories c 
            ON p.category_id = c.id 
        WHERE p.id = $1
        `, [id]
    )

    res.status(200).json(result.rows[0])
}

const addProduct = async (request, response) => {
    const {name, description, category, price, quantity} = request.body; 
    const categories = await pool.query(`
        SELECT * 
        FROM categories
        WHERE name = $1
        `, [category]
    )

    console.log(name, description, category, price, quantity, categories.rows[0])

    if (!categories.rows[0].id) {
        await pool.query(`
            INSERT INTO categories (name)
            VALUES ($1)
            `, [category]
        )
    }

    const newProduct = await pool.query(`
        INSERT INTO products(category_id, name, description, price, stock_quantity)
        VALUES ($1, $2, $3, $4, $5)
        `, [categories.rows[0].id, name, description,  price, quantity]
    )

    response.status(200).json({newProduct})
}

const updateProduct = async (request, response) => {
    const {id} = request.params;
    const updates = request.body; 

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'No fields provided to update' });
    }
    const setClauses = [];
    const values = [];

    let i = 1; 
    for (const key in updates) {
        setClauses.push(`${key} = $${i}`);
        values.push(updates[key]);
        i++;
    }

    values.push(id);

    const query = `
    UPDATE products
    SET ${setClauses.join(', ')}
    WHERE id = $${i}
    RETURNING *;
  `;


    try {
        const result = await pool.query(query, values)
        if(result.rows.length === 0) {
            return response.status(404).json({error: 'Product not found'});
        }
        response.status(200).json(result.rows[0]);

    } catch (error) {
        console.error(error); 
        response.status(500).json({error: 'Database updated failed'});
    }
}

const deleteProduct = async (request, response) => {
    const {id} = request.params; 
    
    const result = await pool.query(`
        DELETE FROM products
        WHERE id = $1
        `,[id])
    response.status(200).json(`Product deleted`)
}

const getCart = async (req,res) => {
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

const addItemToCart = async (req, res) => {
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

    try {

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
            const addCartItem = await pool.query(`
                INSERT INTO cart_items (cart_id, product_id, quantity)
                VALUES ($1, $2, $3)
                RETURNING *
                `, [cart.rows[0].id, productId, quantity]
            )
        
            if(addCartItem.rows[0]) {
                res.status(200).json({message: "successfully created cart and added item to cart"})
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

        return res.status(200).json(newCartItems.rows)

    } catch(error) {
        console.error(error)
    }
}

const updateCartItemQuantity = async (req, res) => {
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

const deleteCart = async (req,res) => {
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
    deleteCart
}