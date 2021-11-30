const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');
const moment = require('moment');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000/',
    method: ['GET', 'POST'],
  },
});

const usersList = {};
const PORT = 3000;
const chatController = require('./controllers/chatController');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(cors());

io.on('connection', (socket) => {
  usersList[socket.id] = socket.id.substring(0, socket.id.length - 4);

  io.emit('onlineList', usersList, socket.id);

  // socket.on('onlineList', () => {
  //   socket.emit('arrangeUser', socket.id);
  // });

  socket.on('updateUser', (nickname) => {
    usersList[socket.id] = nickname;
    io.emit('updateUser', socket.id, nickname);
    io.emit('onlineList', usersList, socket.id);
  });

  socket.on('message', async ({ chatMessage, nickname }) => {
    const timestamp = moment().format('DD-MM-YYYY hh:mm:ss A');
    const message = `${timestamp} - ${nickname}: ${chatMessage}`;     
    await chatController.createMessage({ chatMessage, nickname, timestamp });
    io.emit('message', (message));
  });

  socket.on('disconnect', () => {
    delete usersList[socket.id];
    // socket.broadcast.emit('offline', socket.id);
    io.emit('onlineList', usersList, socket.id);
  });
});

app.get('/', chatController.getHistory);

http.listen(PORT, () => console.log(`App running on port ${PORT}`));