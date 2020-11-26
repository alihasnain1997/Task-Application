
const User = require('../../models/user');


const saveUser = async (req, res) => {
    try {

        const newUser = new User(req.body);
        await newUser.save()
        const token = await newUser.generateAuthToken()

        res.status(201).json({ newUser, token })
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
    console.log('entered update')
    const _id = req.user._id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isUpdatesValid = updates.every((update) => allowedUpdates.includes(update));
    try {
        if (!isUpdatesValid) {
            throw new Error('Updates are not valid')
        }
        console.log('before user')
        const user = await User.findById(_id)
        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save();
        // //const user = await User.findByIdAndUpdate(_id, body, { new: true, runValidators: true });
        // if (!user) {
        //     throw new Error(`Can't find the user to update`)
        // }
        //const read = await User.findById(_id)
        res.status(201).json(user);
    } catch (e) {
        res.status(404).json(e.message)
    }
}

const deleteUser = async (req, res) => {
    try {
        // const id = req.user._id;
        // const user = await User.findByIdAndDelete(id);
        // if (!user) {
        //     throw new Error(`Can't find the user to delete`)
        // }
        await req.user.remove();
        res.status(201).json(req.user)

    } catch (e) {
        res.status(404).json(e.message)
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken()
        //const publicData = await user.getPublicProfile();
        res.status(200).json({ user, token })
    } catch (e) {
        res.status(404).json(e.message)
    }
}

const getSelfData = async (req, res) => {
    try {
        res.status(201).json(req.user)
    } catch (e) {
        res.status(404).json(e + " error in get self data")
    }
}


const logoutUser = async (req, res) => {
    try {
        req.token = {};
        //await req.user.save();
        res.status(200).send('User logged out seccessfully')

    } catch (e) {
        res.status(500)
    }
}

const logoutAllUsers = async (req, res) => {
    try {
        req.user.tokens = [];
        console.log(req.user)
        await req.user.save();
        res.status(200).send('all sessions logout')
    } catch (e) {
        res.status(500)
    }
}
//await bcrypt.compare("userpass", hashpass)
module.exports = {
    saveUser: saveUser,
    getUsers: getUsers,
    getUser: getUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    loginUser: loginUser,
    getSelfData: getSelfData,
    logoutUser: logoutUser,
    logoutAllUsers: logoutAllUsers,

}