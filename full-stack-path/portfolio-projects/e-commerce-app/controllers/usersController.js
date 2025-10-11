import pool from "../models/database.js";

import { getProductById } from "./productsController.js";

export const getUserById = async (req, res) => {
  if (!req.session || !req.session.userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const user = await pool.query("SELECT id, email FROM users WHERE id = $1", [req.session.userId]);
    if (!user.rows[0]) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get orders by user ID
export const getOrdersByUserId = async (req, res) => {
    const { userId } = req.session;
    try {
        const orders = await pool.query('SELECT * FROM orders WHERE user_id = $1', [id]);
        res.status(200).json(orders.rows);
    } catch (error) {
        console.log('Error fetching orders by user ID:', error);
        res.status(500).json({ error: error.message });
    }
}

//create order for user
export const createOrderForUser = async (req, res) => {
    const { userId } = req.session;
    const { quantity } = req.body;
    try {
        const newOrder = await pool.query(
            'INSERT INTO orders (user_id, total, status) VALUES ($1, $2, $3) RETURNING *', [id, total, status]
        );
        
        const product = await getProductById({ params: { id: productId } });
        if (product.status !== 200) {
            return res.status(400).json({ error: 'Invalid product ID' });
        }   

        const orderItem = await pool.query(
            'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2) RETURNING *', 
            [newOrder.rows[0].id, product.rows[0].id, 2, product.rows[0].price]
        );
        res.status(201).json({ order: newOrder.rows[0], orderItem: orderItem.rows[0] });
    } catch (error) {
        console.log('Error creating order for user:', error);
        res.status(500).json({ error: error.message });
    }
}

