const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/TaskManager`;
const DB_NAME = 'TaskManager';

module.exports = () => MongoClient.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((connection) => connection.db(DB_NAME))
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  });
