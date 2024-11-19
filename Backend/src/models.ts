import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: String,
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
});

export const Task = mongoose.model("Task", taskSchema);

