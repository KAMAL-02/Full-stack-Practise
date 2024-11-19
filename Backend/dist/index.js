"use strict";
//! Process to run Nodejs using Ts is
//! 1. npm init -y
//! 2. npx tsc --init
//! 3. modify tsconfig.json rootdir - ./src outdir - ./dist
//! 4. npm i express and npm install --save-dev @types/express @types/node
//! 5  create src folder and index.ts file and start coding
//! 6  do tsc -b to compile ts to js which will create dist/index.js and then nodemon dist/index.js to run the server
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));
app.use(express_1.default.json());
//! No overload matches this call error appears because of incompatible typescript and express version
//! to fix this do npm install --save-dev @types/express@^4.17.21 ,, install 4.17.21 version of express
app.post("/add-task", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, isCompleted } = req.body;
    try {
        const task = yield models_1.Task.create({
            title,
            description,
            isCompleted
        });
        if (!task) {
            return res.status(400).json({ message: 'Task not created' });
        }
        return res.status(201).json({ task });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}));
app.get("/get-task", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield models_1.Task.find({});
        if (!tasks) {
            return res.status(404).json({ message: 'Tasks not found' });
        }
        return res.status(200).json({ tasks });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}));
app.delete("/delete-task", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const tasks = yield models_1.Task.find({ _id: id });
        if (!tasks) {
            return res.status(404).json({ message: 'Task not found' });
        }
        const deletedTask = yield models_1.Task.deleteOne({ _id: id });
        return res.status(200).json({ message: 'Task deleted' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}));
app.put("/update-task", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { isCompleted, id } = req.body;
    try {
        const updatedTask = yield models_1.Task.findByIdAndUpdate(id, { isCompleted }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json({ task: updatedTask });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}));
app.get("/", (req, res) => {
    res.send("Hello");
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
