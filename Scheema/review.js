const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const _ = require("lodash");
require("dotenv").config();

const Schema = mongoose.Schema;
const review = new Schema({
    //content: String,
    rate:Number,
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

const reviews = mongoose.model('reviews', review);
module.exports = reviews;