import mongoose from 'mongoose';
import  _ from "lodash";
import * as dotenv from 'dotenv'
dotenv.config()

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
export default comments;