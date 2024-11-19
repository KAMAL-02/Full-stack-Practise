"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    title: {
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
exports.Task = mongoose_1.default.model("Task", taskSchema);
