const pool = require('../utils/pool')


const getAllOrders = async (req, res, next) => {
    const userId = req.user.id
    const orders = await pool.query(`
        SELECT o.id, o.user_id, o.total_amount, o.payment_id, ot.product_id, ot.price 
        FROM orders o
        JOIN order_items ot
            ON o.id = ot.order_id 
        WHERE o.user_id = $1
        `, [userId])

    if (orders.rows.length > 0) {
        res.status(200).json(orders.rows)
    }
}

const getOrderById = async (req, res, next) => {
    const userId = req.user.id 
    const {id} = req.params;
    const order = await pool.query(`
        SELECT o.id, o.user_id, o.total_amount, o.payment_id, ot.product_id, ot.price 
        FROM orders o
        JOIN order_items ot
            ON o.id = ot.order_id 
        WHERE o.user_id = $1 and o.id = $2
        `,[userId, id]
    )

    if (order.rows[0]) {
        res.status(200).json(order.rows[0])
    }
}


module.exports = {
    getAllOrders, 
    getOrderById
}