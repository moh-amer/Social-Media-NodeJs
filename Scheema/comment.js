const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const _ = require("lodash");
require("dotenv").config();

const Schema = mongoose.Schema;
const comment = new Schema({
    content: String,
    date:Date,
    creator:{
        type:Schema.Types.ObjectId,
        read:'users',
    },
    post:{
        type:Schema.Types.ObjectId,
        read:'posts',
    }
    
}
);

const comments = mongoose.model('comments', comment);
module.exports = comments;