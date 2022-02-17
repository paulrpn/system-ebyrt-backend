const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('../middlewares/errorHandler');

const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasksController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', getTasks);
app.get('/task/:id', getTaskById);
app.post('/task', createTask);
app.put('/task/:id', updateTask);
app.delete('/task/:id', deleteTask);

app.use(errorHandler);

module.exports = app;
