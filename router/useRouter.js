import express from "express";
import user from "../Scheema/user.js";
import  validator from "../helpers/validator.js";
import jwt from 'jsonwebtoken';
import  promisify from 'util';
import  customError from "../helpers/CustomError.js";
import"express-async-errors";
const sign = promisify.promisify(jwt.sign);
const ver = promisify.promisify(jwt.verify);

const jwtscrt =process.env.JWTSCRT ;

const router = express();
router.use(express.json());

router.post("/signin",validator.validateLogin,async (req, res, next) => {
  const {username , password} = req.body 
  const luser = await user.findOne({username});
  if (!luser)  throw new customError("user name or password is incorrect ", 400) ;
  const isMatch = await luser.CompairPass(password);
  if (!isMatch)  throw new customError("user name or password is incorrect ", 400) ;
  const payload = {id:luser._id};
  const token = await sign(payload ,jwtscrt ,{expiresIn:'4h'});
  const result = {
    message : "welcome" ,
    luser,
    token 
  }
  res.send(result) ;
});

router.post("/profile", validator.authntecate,async(req , res , next) => {
  
  const usr = await user.findById(req.uid);
  if (!usr)  throw new customError("user not found ", 400) ;
  req.user = usr ;
  return next();
}
, async(req , res , next)=>{
  res.send(req.user);
})

router.post("/signUp", async (req, res, next) => {
  
    const newuser = new user(
      {
        username: req.body.username,
        password:req.body.password,
        role:req.body.role
      })
    await newuser.save();
    res.send("New user created scucessfully");
});


router.put("/update", validator.authntecate,async (req, res) => {

    const updatedUser = await user.findByIdAndUpdate(req.uid, req.body, { new: true });
    res.send("User updated scucessfully");
});

router.delete("/delete", validator.authntecate, async (req, res, next) => {

  const deleteUser = await user.findByIdAndDelete({username: req.body.userToDel}, { new: true });
  console.log(deleteUser)
  res.send("User deleted scucessfully");

});

export default router;
