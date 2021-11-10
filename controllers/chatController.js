const chatModel = require('../models/chatModel');

const HTTP_OK = 200;

const createMessage = async (req, res) => {
  const { chatMessage, nickname, timestamp } = req.body;
  const sendMessage = await chatModel.createMessage({ chatMessage, nickname, timestamp });

  res.status(HTTP_OK).render('chatView', sendMessage);
};

const getHistory = async (_req, res) => {
  const { message, nickname, timestamp } = await chatModel.getHistory();

  res.status(HTTP_OK).render('chatView', { message, nickname, timestamp });
};

module.exports = {
  getHistory,
  createMessage,
};