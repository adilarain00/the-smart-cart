// Socket.IO server for real-time messaging and user presence
const socketIO = require('socket.io');
const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

require('dotenv').config({
  path: './.env',
});

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Socket server is running...');
});

// In-memory user management for socket connections
let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
};

const createMessage = ({ senderId, receiverId, text, image }) => ({
  senderId,
  receiverId,
  text,
  image,
  seen: false,
});

// Socket.IO connection and event handling
io.on('connection', (socket) => {
  console.log(`a user is connected`);

  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  const messages = {};

  // Handle sending messages between users
  socket.on('sendMessage', ({ senderId, receiverId, text, image }) => {
    const message = createMessage({ senderId, receiverId, text, image });
    const user = getUser(receiverId);

    if (!messages[receiverId]) {
      messages[receiverId] = [message];
    } else {
      messages[receiverId].push(message);
    }

    io.to(user?.socketId).emit('getMessage', message);
  });

  // Handle marking messages as seen
  socket.on('messageSeen', ({ senderId, receiverId, messageId }) => {
    const user = getUser(senderId);

    if (messages[senderId]) {
      const message = messages[senderId].find(
        (message) =>
          message.receiverId === receiverId && message.id === messageId
      );
      if (message) {
        message.seen = true;
        io.to(user?.socketId).emit('messageSeen', {
          senderId,
          receiverId,
          messageId,
        });
      }
    }
  });

  // Handle updating last message in conversation
  socket.on('updateLastMessage', ({ lastMessage, lastMessagesId }) => {
    io.emit('getLastMessage', {
      lastMessage,
      lastMessagesId,
    });
  });

  socket.on('disconnect', () => {
    console.log(`a user disconnected!`);
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});

// Start the server
server.listen(process.env.PORT || 4000, () => {
  console.log(`server is running on port ${process.env.PORT || 4000}`);
});
