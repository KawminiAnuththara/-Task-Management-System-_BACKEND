import Task from "../models/Task.js";
import { isItAdmin } from "./userController.js";

// Add Task
export async function addTask(req, res) {
    if (!req.user) {
        return res.status(401).json({ message: "Please login and try again" });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "You are not authorized to perform this action" });
    }

    try {
        const data = req.body;
        const newTask = new Task(data);
        await newTask.save();
        res.json({ message: "Task added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Task creation failed", error });
    }
}

// Get All Tasks
export async function getTasks(req, res) {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (e) {
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
}

// View Single Task by taskId
export async function viewTask(req, res) {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findOne({ taskId });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(task);
    } catch (e) {
        res.status(500).json({ message: "Failed to retrieve task" });
    }
}

// Update Task by taskId
export async function updateTask(req, res) {
    if (!isItAdmin(req)) {
        return res.status(403).json({ message: "You are not authorized to perform this action" });
    }

    try {
        const taskId = req.params.taskId;
        const data = req.body;
        await Task.updateOne({ taskId }, data);
        res.json({ message: "Task updated successfully" });
    } catch (e) {
        res.status(500).json({ message: "Failed to update task" });
    }
}

// Delete Task by taskId
export async function deleteTask(req, res) {
    if (!isItAdmin(req)) {
        return res.status(403).json({ message: "You are not authorized to perform this action" });
    }

    try {
        const taskId = req.params.taskId;
        await Task.deleteOne({ taskId });
        res.json({ message: "Task deleted successfully" });
    } catch (e) {
        res.status(500).json({ message: "Failed to delete task" });
    }
}
