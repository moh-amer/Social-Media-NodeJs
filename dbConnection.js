const mongoose = require('mongoose');
require("dotenv").config();
const mongourl = process.env.mongourl;
mongoose.connect(mongourl)
  .then(() =>{console.log('Connected!')});