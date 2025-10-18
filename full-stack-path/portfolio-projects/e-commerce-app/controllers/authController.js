import pool from "../models/database.js";
import bcrypt from "bcryptjs";
const saltRounds = 10;

export const register = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    console.log('Register: Starting registration for', email);
    
    const hashed = await bcrypt.hash(password, saltRounds);
    
    const existing = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existing.rows.length) {
      console.log('Register: User already exists');
      return res.status(409).json({ error: "User exists" });
    }

    console.log('Register: Inserting new user into database');
    const newUser = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashed]
    );

    console.log('Register: User inserted successfully, id:', newUser.rows[0].id);
    
    // Verify the user was actually saved
    const verify = await pool.query("SELECT * FROM users WHERE id = $1", [newUser.rows[0].id]);
    console.log('Register: Verification query returned:', verify.rows.length, 'rows');

    console.log('Register: About to call req.login');
    
    req.login(newUser.rows[0], (err) => {
        if (err) {
            console.error('Register: req.login failed with error:', err);
            // User is already in DB, so just return success without session
            return res.status(201).json({ 
              userId: newUser.rows[0].id,
              warning: "User created but session failed" 
            });
        }
        console.log('Register: req.login successful');
        res.status(201).json({ userId: newUser.rows[0].id });
    });
  } catch (err) {
    console.error('Register: Caught exception:', err);
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  console.log('Login: Attempt for:', req.body.email);
  const { email, password } = req.body;
  
  try {
    console.log('Login: Querying database for user');
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    
    console.log('Login: Query returned', user.rows.length, 'rows');
    
    if (!user.rows.length) {
      console.log('Login: User not found in database');
      return res.status(400).json({ error: "Invalid credentials" });
    }

    console.log('Login: User found with id:', user.rows[0].id);
    console.log('Login: Comparing passwords');
    
    const valid = await bcrypt.compare(password, user.rows[0].password);
    
    if (!valid) {
      console.log('Login: Password comparison failed');
      return res.status(400).json({ error: "Invalid credentials" });
    }

    console.log('Login: Password valid, calling req.login');
    
    req.login(user.rows[0], (err) => {
        if (err) {
            console.error('Login: req.login failed with error:', err);
            console.error('Login: Error stack:', err.stack);
            return res.status(500).json({ error: "Login failed", details: err.message });
        }
        console.log('Login: req.login successful');
        res.status(200).json({ message: "Logged in" });
    });
  } catch (err) {
    console.error('Login: Caught exception:', err);
    console.error('Login: Exception stack:', err.stack);
    res.status(500).json({ error: err.message });
  }
};

export const logout = (req, res) => {
  console.log('Logout: Starting logout process');
  
  req.logout((err) => {
    if (err) {
      console.error('Logout: req.logout failed:', err);
      return res.status(500).json({ error: "Logout failed" });
    }
    
    console.log('Logout: Passport logout successful, destroying session');
    
    req.session.destroy((err) => {
      if (err) {
        console.error('Logout: Session destroy failed:', err);
        return res.status(500).json({ error: "Session destroy failed" });
      }
      console.log('Logout: Session destroyed successfully');
      res.clearCookie("connect.sid");
      res.status(204).end();
    });
  });
};