const chatModel = require('../models/chatModel');

const createMessage = async ({ chatMessage, nickname, timestamp }) => {
  await chatModel.createMessage({ chatMessage, nickname, timestamp });
};

const getHistory = async (_req, res) => {
  const history = await chatModel.getHistory();

  res.render('chatView', { history });
};

module.exports = {
  getHistory,
  createMessage,
};