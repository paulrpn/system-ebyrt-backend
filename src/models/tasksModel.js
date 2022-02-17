const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getTasks = async () => {
  const conn = await connect();
  const query = await conn.collection('tasks').find({}).toArray();
  return query;
};

const getTaskById = async (id) => {
  const conn = await connect();
  const query = await conn.collection('tasks').findOne({ _id: ObjectId(id) });
  return query;
};

const createTask = async (title, user, status, date) => {
  const conn = await connect();

  const { insertedId } = await conn.collection('tasks').insertOne(
    {
      title,
      user,
      status,
      date,
    },
  );

  return insertedId;
};

const updateTask = async (id, bodyData) => {
  const { title, user, status } = bodyData;
  const conn = await connect();

  const { modifiedCount } = await conn.collection('tasks')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { title, user, status } },
    );
  return modifiedCount;
};

const deleteTask = async (id) => {
  const conn = await connect();
  const { deletedCount } = await conn.collection('tasks')
    .deleteOne({ _id: ObjectId(id) });
  return deletedCount;
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
