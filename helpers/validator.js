const Joi = require('joi');
const jwt = require('jsonwebtoken');
const{ promisify } = require('util');
const ver = promisify(jwt.verify);

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
  const token = req.headers.authorization ;
  if (!token)  throw new customError("user not authurized ", 400) ;
  const {id} = await ver(token,jwtscrt);
  req.uid = id ;
  return next();
}
module.exports = {validateLogin , authntecate}