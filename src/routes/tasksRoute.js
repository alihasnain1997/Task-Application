const express = require('express');
const tasks = require('../models/task');

const taskRouter = express.Router();

const taskFunctions = require('./routeFunctions/taskFunctions')

let msg = { message: 'All task' }
//get all task
taskRouter.get('/', (req, res) => {

    taskFunctions.getTasks(req, res);
})

//get task by id
taskRouter.get('/:id', (req, res) => {
    taskFunctions.getTask(req, res);
});


//update task by id
taskRouter.patch('/:id', (req, res) => {
    taskFunctions.updateTask(req,res);
})

//add new task
taskRouter.post('/', (req, res) => {
    taskFunctions.saveTask(req, res);
})

//delete task
taskRouter.delete('/:id', (req, res) => {
   taskFunctions.deleteTask(req,res)
})

module.exports = taskRouter;