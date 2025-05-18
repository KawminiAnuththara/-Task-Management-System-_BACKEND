import express from "express"
import mongoose from "mongoose";

const app = express();

const mongoUrl = process.env.MONGODB_URL;
mongoose.connect(mongoUrl);

let connection = mongoose.connection
connection.once("open",()=>{
    console.log("MongoDB connection established successfully");
})

app.listen(5000,()=>{
    console.log("running on port 5000");
})
