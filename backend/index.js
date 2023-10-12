import express from "express";
import { PORT, MONGODB_URL } from "./config.js";
import toDoListRoute from "./routes/toDoListRoute.js";
import mongoose from "mongoose";
//import { connect } from "mongoose";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.use("/todolist", toDoListRoute);

// if using only connect, then remove preceding word 'mongoose'
mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });