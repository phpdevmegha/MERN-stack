import Task from "../models/Task.js";

// CREATE task
export const createTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const task = await Task.create({ title, description, priority });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET single task
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task fetched successfully",
      data: task,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid task ID format",
    });
  }
};

// UPDATE task
export const updateTask = async (req, res) => {
  try {
    const { title, description, priority, completed } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.priority = priority ?? task.priority;
    task.completed = completed ?? task.completed;

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await task.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid task ID format",
    });
  }
};
