const User = require('../../models/user');

const saveUser = async (req, res) => {

    try {
        const newUser = new User(req.body);
        await newUser.save()
        res.status(201).json(newUser)
    } catch (e) {
        res.status(404).json(e.message)
    }

}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(201).json(users);
    } catch (e) {
        res.status(404).json(e.message)
    }

}
const getUser = async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error(`Can't find the user`)
        }
        res.status(201).json(user);
    } catch (e) {
        res.status(404).json(e.message)
    }


}

const updateUser = async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isUpdatesValid = updates.every((update) => allowedUpdates.includes(update));
    try {
        if (!isUpdatesValid || body === {}) {
            throw new Error('Updates are not valid')
        }
        const user = await User.findByIdAndUpdate(_id, body, { new: true, runValidators: true });
        if (!user) {
            throw new Error(`Can't find the user to update`)
        }
        const read = await User.findById(_id)
        res.status(201).json(read);
    } catch (e) {
        res.status(404).json(e.message)
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            throw new Error(`Can't find the user to delete`)
        }
        res.status(201).json(user)

    } catch (e) {
        res.status(404).json(e.message)
    }
}

module.exports = {
    saveUser: saveUser,
    getUsers: getUsers,
    getUser: getUser,
    updateUser: updateUser,
    deleteUser: deleteUser,

}