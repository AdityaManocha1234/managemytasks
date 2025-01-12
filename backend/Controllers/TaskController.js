const TaskModel = require("../Models/TaskModel");

const createTask = async (req, res) => {
    const data = req.body;
    try {
        const model = new TaskModel(data);
        await model.save();
        res.status(201).json({ message: 'task is created', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create task', success: false });
    }
}


const fetchAllTasks = async (req, res) => {

    try {
        const data = await TaskModel.find({});

        res.status(200).json({ message: 'All tasks', success: true, data });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get all tasks', success: false });
    }
}


const updateTaskById = async (req, res) => {

    try {
        const id = req.params.id;
        const body = req.body;
        const obj = { $set: { ...body } };
        await TaskModel.findByIdAndUpdate(id, obj);

        res.status(200).json({ message: 'tasks updated', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task', success: false });
    }
}


const deleteTaskById = async (req, res) => {

    try {
        const id = req.params.id;
        await TaskModel.findByIdAndDelete(id);

        res.status(200).json({ message: 'task is deleted', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete task', success: false });
    }
}

module.exports = {
    createTask,
    fetchAllTasks,
    updateTaskById,
    deleteTaskById
}