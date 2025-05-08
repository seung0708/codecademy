const Pool = require('pg').Pool;
require('dotenv').config();
const {passwordHash} = require('./utilities');

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
    console.log(request.body)
    const hashedPassword = await passwordHash(password);
    
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
}

module.exports = {
    register
}