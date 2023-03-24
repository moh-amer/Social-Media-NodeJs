import jwt from 'jsonwebtoken';
import  promisify from 'util';
import  customError from "../helpers/CustomError.js";
import"express-async-errors";
import Joi from 'joi';
import * as dotenv from 'dotenv'
dotenv.config();
const ver = promisify.promisify(jwt.verify);

const jwtscrt=process.env.JWTSCRT ;
const loginSchema = Joi.object({
    username: Joi.string() .min(3).max(30) .required(),
    password: Joi.string().required()})

const validateLogin = (req , res , next) => 
{
   
   const  {error} = loginSchema.validate(req.body);
   if (error) {
    console.log(req.body);
    const err = new Error("requird feilds incomplete") ;
    err.statusCode = 400 ;
    return next(err);
    }
    next();
}

const authntecate = async(req , res , next)=>
{
  const token = req.headers.authorization;
  console.log( req.headers)
  if (!token)  throw new customError("user not authurized ", 400) ;
  const {id} = await ver(token,jwtscrt);
  req.uid = id ;
  return next();
}
export default  {validateLogin , authntecate}