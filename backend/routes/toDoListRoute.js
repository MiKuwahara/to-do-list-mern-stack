import express from "express";
import { ToDo } from "../models/toDoModel.js";

const router = express.Router();

// Route for Creating a new ToDo aka task
router.post("/", async (request, response) => {
    try {
        if(!request.body.taskName){
            return response.status(400).send({
                message: "Send all required fields: taskName",
            });
        };

        const newTask = {
            taskName: request.body.taskName
        };

        const task = await ToDo.create(newTask);

        return response.status(201).send(task);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for Getting ALL ToDos from the database
router.get("/", async (request, response) => {
    try {
        const tasks = await ToDo.find({});

        return response.status(200).json({
            count: tasks.length,
            data: tasks
        }); // resource has been fetched successfully

    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    }
});

// Route for Getting ONE Task using ID
router.get("/:id", async (request, response) => {
    try {

        const { id } = request.params;
        const task = await ToDo.findById(id);

        return response.status(200).json(task); // resource has been fetched succecssfully

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message }); // server-side error
    }
});

// Route for Updating a Task
router.put("/:id", async (request, response) => {
    try {

        if (!request.body.taskName) {
            return response.status(400).send({
                message: "Send all required fields: taskName",
            });
        };

        const { id } = request.params;
        const result = await ToDo.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).send({ message: "Task not found" }); // client gives server incorrect/wrong id
        };

        return response.status(200).send({ message: "Task updated successfully" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message }); // server-side error
    }
});

// Route for Delete a Task
router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const result = await ToDo.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({ message: "Task not found" });
        };

        return response.status(200).send({ message: "Task deleted successfully" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;