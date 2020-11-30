const express = require('express');
const User = require('../models/user');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const userRouter = express.Router();

const UserFunctions = require('./routeFunctions/userFunctions')

//get all users
userRouter.get('/', (req, res) => {
    UserFunctions.getUsers(req, res);
})

//get user data(self)
userRouter.get('/me', (req, res) => {
    UserFunctions.getSelfData(req, res)
})

//logout user
userRouter.post('/logout', (req, res) => {
    UserFunctions.logoutUser(req, res)
})

//logout all user sessions
userRouter.post('/logoutAll', (req, res) => {
    UserFunctions.logoutAllUsers(req, res)
})

//get user by id
userRouter.get('/:id', (req, res) => {
    UserFunctions.getUser(req, res);

})

//update user by id
userRouter.patch('/', (req, res) => {
    UserFunctions.updateUser(req, res);
})

//add new user
userRouter.post('/', (req, res) => {
    UserFunctions.saveUser(req, res)
})

//delete user
userRouter.delete('/me', (req, res) => {
    UserFunctions.deleteUser(req, res)
})

//uploading avatar
userRouter.post('/me/avatar',upload.single('avatar'),(req,res)=>{
    res.status(200).send('upload successful')

})

module.exports = userRouter;