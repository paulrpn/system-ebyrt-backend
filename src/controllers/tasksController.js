const tasksService = require('../services/tasksService');

const getTasks = async (_req, res) => {
  const tasks = await tasksService.getTasks();
  res.status(200).json(tasks);
};

const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await tasksService.getTaskById(id);

    return res.status(200).json(task);
  } catch (error) {
    return next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, user, status } = req.body;
    const newTask = await tasksService.createTask(title, user, status);

    return res.status(201).json({ Task: newTask });
  } catch (error) {
    return next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bodyData = req.body;

    const updatedTask = await tasksService.updateTask(id, bodyData);

    return res.status(200).json(updatedTask);
  } catch (error) {
    return next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await tasksService.deleteTask(id);

    return res.status(204).json();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
