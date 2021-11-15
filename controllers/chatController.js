const chatModel = require('../models/chatModel');

const HTTP_OK = 200;

const createMessage = async ({ chatMessage, nickname, timestamp }) => {
  await chatModel.createMessage({ chatMessage, nickname, timestamp });
};

const getHistory = async (_req, res) => {
  const { message, nickname, timestamp } = await chatModel.getHistory();

  res.status(HTTP_OK).render('chatView', { message, nickname, timestamp });
};

module.exports = {
  getHistory,
  createMessage,
};