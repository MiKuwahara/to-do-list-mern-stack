import mongoose from "mongoose";

const toDoSchema = mongoose.Schema(
    {
        taskName: {
            type: String,
            required: true,
        },
        // date
    },
    {
        timestamps: true,
    }
);

export const ToDo = mongoose.model("ToDo", toDoSchema);