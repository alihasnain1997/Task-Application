const express = require('express');
const User = require('../models/user');

const userRouter = express.Router();

const UserFunctions = require('./routeFunctions/userFunctions')

let msg = { message: 'All users' }
//get all users
userRouter.get('/', (req, res) => {
    UserFunctions.getUsers(req, res);
})

//get user by id
userRouter.get('/:id', (req, res) => {
    UserFunctions.getUser(req,res);

});


//update user by id
userRouter.put('/:id', (req, res) => {
    res.sendStatus(200).json({ message: 'selected user updated' })
})

//add new user
userRouter.post('/', (req, res) => {
    UserFunctions.saveUser(req, res)
})

//delete user
userRouter.delete('/:id', (req, res) => {
    res.sendStatus(200).json({ message: 'selected user deleted' })
})

module.exports = userRouter;