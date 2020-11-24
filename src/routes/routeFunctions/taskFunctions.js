const Task = require('../../models/task');

const saveTask = async (req, res) => {

    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json(newTask)
    } catch (e) {
        res.status(404).json(e.message)
    }


}

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(201).json(tasks);
    }
    catch (e) {
        res.status(404).json(e.message)
    }


}
const getTask = async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id);
        if (!task) {
            throw new Error(`can't find the related task`);
        }
        res.status(201).json(task)
    }
    catch (e) {
        res.status(404).json(e.message)
    }

}
module.exports = {
    saveTask: saveTask,
    getTasks: getTasks,
    getTask: getTask
}