import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import  _ from "lodash";
import * as dotenv from 'dotenv'
dotenv.config()

const salt = process.env.salt;
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
        const hashedpassword = await bcrypt.hash(this.password,parseInt(salt));
        this.password = hashedpassword;
    }
    next();
})

users.methods.CompairPass = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const user = mongoose.model('users', users);
export default user;