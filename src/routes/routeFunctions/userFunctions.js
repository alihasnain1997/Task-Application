const User = require('../../models/user');

const saveUser = (req, res) => {

    const newUser = new User(req.body);
    newUser.save().then((u) => {
        res.status(201).json(u)

    }).catch((error) => {
        res.status(400).json(error.message)
    })
}

const getUsers = (req, res) => {
    User.find({}).then((u) => {
        res.status(200).json(u);

    }).catch((error) => {

        res.status(400).json(error.message)

    });

}
const getUser = (req, res) => {
    const _id = req.params.id
    User.findById(_id).then((u) => {
        if (!u) {
            return res.sendStatus(404)
        }
        res.status(200).json(u);
    }).catch((error) => {
        res.status(400).json(error.message)
    })
}
module.exports = {
    saveUser: saveUser,
    getUsers: getUsers,
    getUser: getUser,
}