require('dotenv').config();
const express = require('express');
const logger = require('morgan')
const passport = require('passport');
const app = express(); 

const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const productsRouter = require('./routes/products')
const cartRouter = require('./routes/cart')
const checkoutRouter = require('./routes/checkout')
const ordersRouter = require('./routes/orders')

const port = 3000; 

//parse incoming request swith JSON payloads
app.use(express.json())

//parse form data and make it available at req.body
app.use(express.urlencoded({extended: false}))

//logging http requests
app.use(logger('dev'))

app.use(passport.initialize());

app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/products/', productsRouter)
app.use('/cart', cartRouter)
app.use('/checkout', checkoutRouter)
app.use('/orders', ordersRouter)

app.get('/', (request, response) => {
    response.json({info: 'Ecommerce RestAPI'})
})


app.listen(port, () => {
    console.log(`App running on port ${port}`)
})