import mongoose from 'mongoose';
import  _ from "lodash";
import * as dotenv from 'dotenv'
dotenv.config()

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
export default posts;