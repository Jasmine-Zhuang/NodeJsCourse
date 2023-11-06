const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const Filter = require("bad-words");
const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  // socket === client
  console.log("New WebSocket connection.");

  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });
    if (error) {
      return callback(error);
    }

    socket.join(user.room);
    // socket.emit (send to single client)
    // socket.broadcast.emit (send to all clients except this socket)
    // io.to.emit (send event to all in this room)
    // socket.broadcast.to.emit (send to all except for this client in this room)
    // io.emit (to all clients)

    socket.emit("message", generateMessage('Admin', "Welcome!"));
    socket.broadcast
      .to(user.room)
      .emit("message", generateMessage('Admin', `${user.username} has joined!`));

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed.");
    }

    io.to(user.room).emit("message", generateMessage(user.username, message)); // all messages will be sent to this room
    callback();
  });

  socket.on("sendLocation", (location, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit(
      "locationMessage",
      generateLocationMessage(
        user.username,
        `https://google.com/maps?q=${location.lat},${location.long}`
      )
    );
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage('Admin', `${user.username} has left!`)
      );
    }
  });
});

server.listen(port, () => {
  console.log("server is up on port " + port);
});
