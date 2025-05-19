
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskId:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
    },
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    
    deadline:{
        type:Date,
        required:true
    },
    assignedTo:{
        type:String,
        required:true
    },
    status: { 
        type: String, 
        enum: ["Pending", "In Progress", "Done"], 
        default: "Pending" 
    }
}, { timestamps: true });

const Task = mongoose.models.Task || mongoose.model("Task",taskSchema);

export default Task;
