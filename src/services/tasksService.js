const { ObjectId } = require('mongodb');
const tasksModel = require('../models/tasksModel');

const ERROR_MSG_1 = {
  status: 400,
  message: 'Invalid taskId',
};

const ERROR_MSG_2 = {
  status: 404,
  message: 'Task not found',
};

const getTasks = async () => {
  const tasks = await tasksModel.getTasks();
  return tasks;
};

const getTaskById = async (id) => {
  if (!ObjectId.isValid(id)) throw ERROR_MSG_1;
  const task = await tasksModel.getTaskById(id);
  if (!task) throw ERROR_MSG_2;
  return task;
};

const createTask = async (title, user, status) => {
  const date = new Date();
  const { newTaskId } = await tasksModel.createTask(title, user, status, date);

  return {
    _id: newTaskId,
    title,
    user,
    status,
    date,
  };
};

const updateTask = async (id, bodyData) => {
  const { title, user, status } = bodyData;
  const { date } = await getTaskById(id);
  const updateStatus = await tasksModel.updateTask(id, bodyData);

  if (updateStatus === 0) throw ERROR_MSG_2;

  return {
    _id: id,
    title,
    user,
    status,
    date,
  };
};

const deleteTask = async (id) => {
  await getTaskById(id);
  await tasksModel.deleteTask(id);
  return null;
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
