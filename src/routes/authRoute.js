const express = require('express');
const User = require('../models/user');

const userRouter = express.Router();

const UserFunctions = require('./routeFunctions/userFunctions')


//add new user
userRouter.post('/', (req, res) => {
    UserFunctions.saveUser(req, res)
})

//login user
userRouter.post('/login', (req, res) => {
   UserFunctions.loginUser(req, res)
   
})

module.exports = userRouter;