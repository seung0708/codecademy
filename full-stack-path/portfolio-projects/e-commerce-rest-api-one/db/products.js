const pool = require('../utils/pool')

const getAllProducts = async (req, res, next) => {
    const products = await pool.query(`
        SELECT p.name, p.description, c.name AS category, p.price 
        FROM products p
        JOIN categories c 
            ON p.category_id = c.id 
        `
    )
    res.status(200).json(products.rows)
}

const getProductById = async (req, res, next) => {
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

const addProduct = async (req, res, next) => {
    const {name, description, category, price, quantity} = req.body; 
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

    res.status(200).json({newProduct})
}

const updateProduct = async (req, res, next) => {
    const {id} = req.params;
    const updates = req.body; 

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
            return res.status(404).json({error: 'Product not found'});
        }
        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error(error); 
        res.status(500).json({error: 'Database updated failed'});
    }
}

const deleteProduct = async (req, res, next) => {
    const {id} = req.params; 
    
    const result = await pool.query(`
        DELETE FROM products
        WHERE id = $1
        `,[id])
    res.status(200).json(`Product deleted`)
}

module.exports = {
    addProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct
}