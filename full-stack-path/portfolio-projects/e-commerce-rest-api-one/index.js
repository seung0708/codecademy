require('dotenv').config();
const express = require('express');
const passport = require('passport');
const app = express(); 

const authRouter = require('./routes/auth')
const usersRotuer = require('./routes/users')
const productsRouter = require('./routes/products')
const cartRouter = require('./routes/cart')

const port = 3000; 

//parse incoming request swith JSON payloads
app.use(express.json())

//parse form data and make it available at req.body
app.use(express.urlencoded({extended: false}))

app.use(passport.initialize());

app.use('/auth', authRouter)
app.use('/users', usersRotuer)
app.use('/products/', productsRouter)
app.use('/cart', cartRouter)

app.get('/', (request, response) => {
    response.json({info: 'Ecommerce RestAPI'})
})

//checkout
app.post('/cart/:id/checkout', isAuthenticated, db.checkout);

app.get('/orders', isAuthenticated, db.getAllOrders)
app.get('/orders/:id', isAuthenticated, db.getOrderById)

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})