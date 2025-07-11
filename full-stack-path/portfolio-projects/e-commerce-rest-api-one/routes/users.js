const db = require('../db/users')
const isAuthenticated = require('../utils/passport');
const express = require('express');
const usersRouter = express.Router();

usersRouter.get('/users/:id', isAuthenticated, db.getUserById)
usersRouter.patch('/users/:id', isAuthenticated, db.updateUser)
usersRouter.delete('/users/:id', isAuthenticated, db.deleteUser)

module.exports = usersRouter;