const jwt = require('jsonwebtoken')
const User = require('../models/user');
const mongoose = require('mongoose');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, 'testCode')
        const user = await User.findById({ _id: decode._id });
        if (!user) {
            throw new Error('')
        }
        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        res.status(404).json(e + " Authentication Error")
    }
}
module.exports = auth;