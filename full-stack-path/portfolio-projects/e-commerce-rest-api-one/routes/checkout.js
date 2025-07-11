const db = require('../db/checkout')
const express = require('express')
const checkoutRouter = express.Router()

checkoutRouter.post('/cart/:id/checkout', isAuthenticated, db.checkout);

module.exports = checkoutRouter