const Pool = require('pg').Pool;
const jwt = require('jsonwebtoken');
const {passwordHash, validatePassword} = require('./utilities');

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

const findUserById = async (id) => {
    const result = await pool.query(`
        SELECT * 
        FROM users
        WHERE id = $1
        `, [id]
    )
    return result.rows[0]
}

const updateUser = async(req, res) => {
    const {id} = req.params; 
    const userId = req.user.id;
    const updates = req.body;

    if(id !== userId) {
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



const getAllProducts = async (request, response) => {
    const products = await pool.query(`
        SELECT p.name, p.description, c.name AS category, p.price 
        FROM products p
        JOIN categories c 
            ON p.category_id = c.id 
        `
    )
    response.status(200).json({products: products.rows})
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
    console.log(id)
    const result = await pool.query(`
        DELETE FROM products
        WHERE id = $1
        `,[id])
    response.status(200).json(`Product deleted`)
}

module.exports = {
    register,
    login,
    getUserByEmail,
    findUserById,
    updateUser,
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct
}