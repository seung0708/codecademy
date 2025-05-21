require('dotenv').config();
const express = require('express');
const passport = require('passport');
const app = express(); 
const db = require('./queries')
const port = 3000; 
const isAuthenticated = require('./passport');

//parse incoming request swith JSON payloads
app.use(express.json())

//parse form data and make it available at req.body
app.use(express.urlencoded({extended: false}))

app.use(passport.initialize());


app.get('/', (request, response) => {
    response.json({info: 'Ecommerce RestAPI'})
})

app.post('/register', db.register)
app.post('/login', db.login)
app.get('/users/:id', isAuthenticated, db.getUserById)
app.patch('/users/:id', isAuthenticated, db.updateUser)
app.delete('/users/:id', isAuthenticated, db.deleteUser)

app.get('/products', db.getAllProducts)
app.get('/products/:id', db.getProductById)
app.post('/products', db.addProduct)
app.patch('/products/:id', db.updateProduct);
app.delete('/products/:id', db.deleteProduct)

app.get('/cart/:id', isAuthenticated, db.getCart)
app.post('/cart', isAuthenticated, db.addItemToCart)
app.patch('/cart/:id', isAuthenticated, db.updateCartItemQuantity)
app.delete('/cart/:id', isAuthenticated, db.deleteCart)

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})