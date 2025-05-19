import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import bodyParser from "body-parser";
import taskRouter from "./routes/taskRouter.js";

dotenv.config();

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use((req,res,next)=>{
    let token = req.header("Authorization");
    //create the auth

    if (token!=null){
        token=token.replace("Bearer ","");
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(!err){
                req.user = decoded;
            }
        });
    }
    next()
})

const mongoUrl = process.env.MONGODB_URL;

mongoose.connect(mongoUrl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


  app.use(express.json());

  app.use("/api/users",userRouter);
  app.use("/api/task",taskRouter);

app.listen(3000, () => {
  console.log("running on port 3000");
});
