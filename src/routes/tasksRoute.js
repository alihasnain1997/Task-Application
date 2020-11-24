const express = require('express');
const tasks = require('../models/task');

const taskRouter = express.Router();

const taskFunctions = require('./routeFunctions/taskFunctions')

let msg = { message: 'All users' }
//get all users
taskRouter.get('/', (req, res) => {

    taskFunctions.getTasks(req, res);
})

//get user by id
taskRouter.get('/:id', (req, res) => {
    taskFunctions.getTask(req, res);
});


//update user by id
taskRouter.put('/:id', (req, res) => {
    res.sendStatus(200).json({ message: 'selected user updated' })
})

//add new user
taskRouter.post('/', (req, res) => {
    taskFunctions.saveTask(req, res);
})

//delete user
taskRouter.delete('/:id', (req, res) => {
    res.sendStatus(200).json({ message: 'selected user deleted' })
})

module.exports = taskRouter;