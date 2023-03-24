import  express from "express"
import  db  from "./dbConnection.js" ;
import morgan from "morgan" ;
import  user from "./router/useRouter.js";
import * as dotenv from 'dotenv'
dotenv.config()
const prt = process.env.PORT;

db.connectDB()
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

