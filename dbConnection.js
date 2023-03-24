import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
dotenv.config()
const mongourl = process.env.mongourl;

function connectDB ()
{
  mongoose.connect(mongourl)
  .then(() =>{console.log('Connected!')});
}
export default {connectDB} ;
