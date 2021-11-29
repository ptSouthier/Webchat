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

const PORT = 3000;
const chatController = require('./controllers/chatController');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(cors());

io.on('connection', (socket) => {
  console.log(`O Cliente ${socket.id} se conectou`);

  socket.emit('initialNickname', (socket.id));

  socket.on('message', async ({ chatMessage, nickname }) => {
    const timestamp = moment().format('DD-MM-YYYY hh:mm:ss A');
    const message = `${timestamp} - ${nickname}: ${chatMessage}`;     
    await chatController.createMessage({ chatMessage, nickname, timestamp });
    io.emit('message', (message));
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', 'Poxa, alguém deixou o chat :/');
  });
});

app.get('/', chatController.getHistory);

http.listen(PORT, () => console.log(`App runing on port ${PORT}`));