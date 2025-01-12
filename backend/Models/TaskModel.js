const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    taskName: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        required: true
    }
})

const TaskModel = mongoose.model('taskmanagers', TaskSchema);

module.exports = TaskModel