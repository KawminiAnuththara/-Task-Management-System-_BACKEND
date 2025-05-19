import express from "express"
import { addTask, deleteTask, getTasks, updateTask, viewTask } from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.post("/",addTask);

taskRouter.get("/",getTasks);

taskRouter.put("/:key",updateTask);

taskRouter.delete("/:key",deleteTask);

taskRouter.get("/:key",viewTask);

export default taskRouter;