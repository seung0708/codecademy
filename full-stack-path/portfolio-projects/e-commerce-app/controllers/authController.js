import pool from '../models/database.js';
import bcrypt from 'bcryptjs';
const saltRounds = 10;

// register user 
export const register = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    try {
        const newUser = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email, hashedPassword]
        );
        
        req.session.userId = newUser.rows[0].id; // Store user ID in session
        res.status(201).json({ 
            message: 'User registered successfully', 
            userId: newUser.rows[0].id
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// login user
export const login = async (req, res) => {
    const { username, password } = req.body;
    try { 
        const user = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );
        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        req.session.userId = user.rows[0].id; // Store user ID in session
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }   
}

// logout user
export const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Could not log out. Please try again.' });
        }
        res.clearCookie('connect.sid'); // clear the session cookie
        res.status(200).json({ message: 'Logout successful' });
    });
}