const express = require("express");
const user = require("../Scheema/user");
const validator = require("../helpers/validator");
const jwt = require('jsonwebtoken');
const{ promisify } = require('util');
const  customError = require("../helpers/CustomError");
require("express-async-errors");
const sign = promisify(jwt.sign);
const ver = promisify(jwt.verify);

jwtscrt =process.env.jwtscrt ;

const router = express();
router.use(express.json());

router.post("/signin",validator.validateLogin,async (req, res, next) => {
  const {username , password} = req.body 
  const luser = await user.findOne({username});
  if (!luser)  throw new customError("user name or password is incorrect ", 400) ;
  isMatch = await luser.CompairPass(password);
  if (!isMatch)  throw new customError("user name or password is incorrect ", 400) ;
  const payload = {id:luser._id};
  const token = await sign(payload ,jwtscrt ,{expiresIn:'4h'});
  result = {
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
  
    newuser = new user(
      {
        username: req.body.username,
        password:req.body.password,
        role:req.body.role
      })
    await newuser.save();
    res.send("New user created scucessfully");
});


router.put("/update", validator.authntecate,async (req, res) => {

    updatedUser = await user.findByIdAndUpdate(req.uid, req.body, { new: true });
    res.send("Task updated scucessfully");
});

router.delete("/delete", validator.authntecate, async (req, res, next) => {

  deleteUser = await user.findByIdAndDelete(req.uid, { new: true });
  console.log(deleteUser)
  res.send("Task deleted scucessfully");

});

module.exports = router;
