const expressJWT = require('express-jwt'); 
require('dotenv').config();

const checkJwt = expressJWT({
    secret: process.env.JWT_SECRET_KEY, 
    algorithms: ['HS256'],
    requestProperty: 'user'
})

module.exports = checkJwt; 