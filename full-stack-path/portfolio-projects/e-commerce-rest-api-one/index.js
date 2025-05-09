const express = require('express');
const passport = require('passport');
const app = express(); 
const db = require('./queries')
const port = 3000; 
const {isAuthenticated} = require('./passport');

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

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})