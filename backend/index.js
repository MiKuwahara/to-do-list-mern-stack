import express from "express";
import { PORT, MONGODB_URL } from "./config.js";
import toDoListRoute from "./routes/toDoListRoute.js";
import cors from "cors";
import mongoose from "mongoose";
//import { connect } from "mongoose";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
/*app.use({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
});*/

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