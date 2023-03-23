const express = require("express");
const db = require("./dbConnection");
const morgan = require("morgan");
require("dotenv").config();
const user = require("./router/useRouter");
const prt = process.env.PORT;

const app = express();
app.use(morgan("combined"));
app.use(express.json());

app.use("/user",user);
app.listen(prt);

app.use((err, req, res, next) => {
  console.error(err.stack)
  err.statusCode = err.statusCode || 500 ;
  err.message =
  res.status(err.statusCode).json({
    status: "error",
    message: err.message || "something went wrong",
    err
  })
})

