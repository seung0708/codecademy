import pool from "../models/database.js";

import { getProductById } from "./productsController.js";

export const getUserById = async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });

  try {
    const user = await pool.query("SELECT id, email FROM users WHERE id = $1", [req.user.id]);
    
    if (!user.rows[0]) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user.rows[0]);
  } catch (err) {
    console.log('Error fetching user by id', err)
    res.status(500).json({ error: err.message });
  }
};

//get orders by user ID
export const getOrdersByUserId = async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
    try {
        const orders = await pool.query('SELECT * FROM orders WHERE user_id = $1', [req.user.id]);
        res.status(200).json(orders.rows);
    } catch (error) {
        console.log('Error fetching orders by user ID:', error);
        res.status(500).json({ error: error.message });
    }
}
