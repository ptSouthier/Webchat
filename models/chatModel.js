const connection = require('./connection');

const createMessage = async ({ chatMessage, nickname, timestamp }) => {
  const db = await connection();
  await db.collection('messages').insertOne({ message: chatMessage, nickname, timestamp });
};

const getHistory = async () => {
  const db = await connection();
  const history = await db.collection('messages').find({}).toArray();
  return history;
};

module.exports = {
  getHistory,
  createMessage,
};