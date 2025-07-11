const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');
const {passwordHash, validatePassword, checkUserAccess} = require('./utils/utilities');

const register = async (req, res, next) => {
    const {firstName, lastName, email, password} = req.body;

    const users = await pool.query(`
        SELECT * 
        FROM users
        WHERE email = $1
    `, [email])

    if (users.rows[0]) {
        res.status(409).json({message: 'Email already exists'})
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

const login = async (req, res, next) => {
    const {email, password} = req.body; 
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
    
    res.status(200).json({message: 'Login successful', token})
}
