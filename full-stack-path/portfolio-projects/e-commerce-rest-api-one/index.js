require('dotenv').config();
const express = require('express');
const passport = require('passport');
const app = express(); 

const authRouter = require('./routes/auth')
const usersRotuer = require('./routes/users')
const productsRouter = require('./routes/products')

const port = 3000; 

//parse incoming request swith JSON payloads
app.use(express.json())

//parse form data and make it available at req.body
app.use(express.urlencoded({extended: false}))

app.use(passport.initialize());

app.use('/auth', authRouter)
app.use('/users', usersRotuer)
app.use('/products/', productsRouter)

app.get('/', (request, response) => {
    response.json({info: 'Ecommerce RestAPI'})
})

app.get('/cart/:id', isAuthenticated, db.getCart)
app.post('/cart', isAuthenticated, db.addItemToCart)
app.patch('/cart/:id', isAuthenticated, db.updateCartItemQuantity)
app.delete('/cart/:id', isAuthenticated, db.deleteCart)

//checkout
app.post('/cart/:id/checkout', isAuthenticated, db.checkout);

app.get('/orders', isAuthenticated, db.getAllOrders)
app.get('/orders/:id', isAuthenticated, db.getOrderById)

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})