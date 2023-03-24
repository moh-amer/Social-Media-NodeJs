import mongoose from 'mongoose';
import  _ from "lodash";
import * as dotenv from 'dotenv'
dotenv.config()

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
export default reviews;