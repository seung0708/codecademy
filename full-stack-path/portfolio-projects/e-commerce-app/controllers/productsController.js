import pool from "../models/database.js";

// get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await pool.query('SELECT * FROM products');
        res.status(200).json(products.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get product by id
export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (product.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        } 
        
        res.status(200).json({
            name: product.rows[0].name, 
            price: product.rows[0].price
        });
    } catch (error) {
        //console.log('Error fetching product by ID:', error);
        res.status(500).json({ error: error.message });
    }
}