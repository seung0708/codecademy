const db = require('../db/products')
const express = require('express')
const productsRouter = express.Router()


productsRouter.get('/products', db.getAllProducts)
productsRouter.get('/products/:id', db.getProductById)
productsRouter.post('/products', db.addProduct)
productsRouter.patch('/products/:id', db.updateProduct);
productsRouter.delete('/products/:id', db.deleteProduct)

module.exports = productsRouter