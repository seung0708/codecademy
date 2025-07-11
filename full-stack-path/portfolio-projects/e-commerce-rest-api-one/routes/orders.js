const db = require('../db/orders')
const ordersRouter = express.Router()

ordersRouter.get('/orders', isAuthenticated, db.getAllOrders)
ordersRouter.get('/orders/:id', isAuthenticated, db.getOrderById)

module.exports = ordersRouter