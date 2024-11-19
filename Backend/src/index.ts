//! Process to run Nodejs using Ts is
//! 1. npm init -y
//! 2. npx tsc --init
//! 3. modify tsconfig.json rootdir - ./src outdir - ./dist
//! 4. npm i express and npm install --save-dev @types/express @types/node
//! 5  create src folder and index.ts file and start coding
//! 6  do tsc -b to compile ts to js which will create dist/index.js and then nodemon dist/index.js to run the server

import express, { Request, Response } from 'express';
import { Task } from "./models"
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URI!)
.then(()=>console.log('Connected to MongoDB'))
.catch((err)=>console.log(err))

app.use(express.json());

//! No overload matches this call error appears because of incompatible typescript and express version
//! to fix this do npm install --save-dev @types/express@^4.17.21 ,, install 4.17.21 version of express

app.post("/add-task", async (req: Request, res: Response) => {
    const { title, description, isCompleted } = req.body;

    try {
        const task = await Task.create({
            title,
            description,
            isCompleted
        });

        if (!task) {
            return res.status(400).json({ message: 'Task not created' });
        }

        return res.status(201).json({ task });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

app.get("/get-task", async(req: Request, res: Response) => {
    try {
        const tasks = await Task.find({});
        if (!tasks) {
            return res.status(404).json({ message: 'Tasks not found' });
        }
        return res.status(200).json({ tasks });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
})

app.delete("/delete-task", async(req: Request, res: Response) => {
    const { id } = req.body;
    try {
        const tasks = await Task.find({_id: id});
        if (!tasks) {
            return res.status(404).json({ message: 'Task not found' });
        }
        const deletedTask = await Task.deleteOne({_id: id});
        return res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
})

app.put("/update-task", async(req: Request, res: Response) => {
    const {isCompleted, id} = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate( id, {isCompleted}, {new: true});
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({ task: updatedTask });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
})

app.get("/", (req: Request, res: Response) => {
    res.send("Hello");
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});