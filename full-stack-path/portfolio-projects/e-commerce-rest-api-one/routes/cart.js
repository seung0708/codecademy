const db = require('../queries')
const express = require('express')
const cartRouter = express.Router()

cartRouter.get('/cart/:id', isAuthenticated, db.getCart)
cartRouter.post('/cart', isAuthenticated, db.addItemToCart)
cartRouter.patch('/cart/:id', isAuthenticated, db.updateCartItemQuantity)
cartRouter.delete('/cart/:id', isAuthenticated, db.deleteCart)

module.exports = cartRouter