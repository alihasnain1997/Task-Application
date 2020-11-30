const Task = require('../../models/task');

const saveTask = async (req, res) => {

    try {
        // const newTask = new Task(req.body);
        const newTask = new Task({
            ...req.body,
            owner: req.user._id
        })
        await newTask.save();
        res.status(201).json(newTask)
    } catch (e) {
        res.status(404).json(e.message)
    }


}

const getTasks = async (req, res) => {
    const match = {};
    const sort = {};
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;

    }
    try {
        //const tasks = await Task.find({owner:req.user._id});
        await req.user.populate({
            //to filter
            path: 'tasks',
            match,
            //to paginate
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                //sort
                // sort:{
                //     //field name 1 for asc -1 for desc
                //     //createdAt: -1
                //     completed: 1
                // }
                sort,
            }
        }).execPopulate()
        res.status(201).json(req.user.tasks);
    }
    catch (e) {
        res.status(404).json(e.message)
    }


}
const getTask = async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user._id });
        if (!task) {
            throw new Error(`can't find the related task`);
        }
        res.status(201).json(task)
    }
    catch (e) {
        res.status(404).json(e.message)
    }

}

const updateTask = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isUpdatesValid = updates.every((update) => allowedUpdates.includes(update));
    try {
        if (!isUpdatesValid) {
            throw new Error('Updates are not valid')
        }
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            throw new Error(`Can't find the task to update`)
        }
        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save();
        res.status(201).json(task);
    } catch (e) {
        res.status(404).json(e.message)
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        // if (!task) {
        //     throw new Error(`Can't find task to delete`)
        // }
        // await task.remove();

        res.status(201).json(task)

    } catch (e) {
        res.status(404).json(e.message)
    }
}
module.exports = {
    saveTask: saveTask,
    getTasks: getTasks,
    getTask: getTask,
    updateTask: updateTask,
    deleteTask: deleteTask
}