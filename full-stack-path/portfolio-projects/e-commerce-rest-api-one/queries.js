const Pool = require('pg').Pool;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {passwordHash, validatePassword} = require('./utilities');

const pool = new Pool({
    user: process.env.DB_USER, 
    host: 'localhost', 
    database: process.env.DB_NAME, 
    password: process.env.DB_PASSWORD, 
    port: 5432
})

const getUserById = (request, response) => {
    const id = request.params.id; 

    pool.query(`
        SELECT *
        FROM users
        WHERE id = $1
        `,[id],
        (error, results) => {
            if(error) {
                throw error
            }
            response.status(200).json(results)
        }
    )
}

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

module.exports = {
    register,
    login,
    getAllProducts,
    addProduct
}