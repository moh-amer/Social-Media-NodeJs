const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const _ = require("lodash");
require("dotenv").config();

const salt = 12;
const Schema = mongoose.Schema;
const users = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'creator', 'user'],
    },
}, 
{
    toJSON: {
        transform: (doc, ret) => {
            const fltrdRet = _.pick(ret, "_id", "username", "role");
            return fltrdRet;
        }
    }
});

users.pre('save', async function (next) {
    if (this.isModified('password')) {
        const hashedpassword = hashpass = await bcrypt.hash(this.password, salt);
        this.password = hashedpassword;
    }
    next();
})

users.methods.CompairPass = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const user = mongoose.model('users', users);
module.exports = user;