const db = require('../db/auth')
const express = require('express')
const authRouter = express.Router(); 


authRouter.post('/register', db.register)
authRouter.post('/login', db.login)


module.exports = authRouter