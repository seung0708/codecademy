const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
const db = require('./queries')
const port = 3000; 

app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({info: 'Ecommerce RestAPI'})
})

app.post('/register', db.register)

app.post('/login', db.login)

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})