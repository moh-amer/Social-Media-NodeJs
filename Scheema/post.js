const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const _ = require("lodash");
require("dotenv").config();

const Schema = mongoose.Schema;
const post = new Schema({
    content: String,
    date:Date,
    creator:{
        type:Schema.Types.ObjectId,
        read:'users',
    }
}
);

const posts = mongoose.model('posts', post);
module.exports = posts;