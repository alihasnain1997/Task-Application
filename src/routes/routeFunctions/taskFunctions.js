const Task = require('../../models/task');

const saveTask = (req, res) => {

    const newTask = new Task(req.body);
    newTask.save().then((u) => {
        res.status(201).json(u)

    }).catch((error) => {
        res.status(400).json(error.message)
    })

}

const getTasks = (req, res) => {
    Task.find({}).then((u) => {
        res.status(200).json(u);

    }).catch((error) => {

        res.status(400).json(error.message)

    });

}
const getTask = (req, res) => {
    const _id = req.params.id
    Task.findById(_id).then((u) => {
        if (!u) {
            return res.sendStatus(404)
        }
        res.status(200).json(u);
    }).catch((error) => {
        res.status(400).json(error.message)
    })
}
module.exports = {
    saveTask: saveTask,
    getTasks: getTasks,
    getTask: getTask
}