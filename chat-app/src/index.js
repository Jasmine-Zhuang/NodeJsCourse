const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const Filter = require("bad-words");
const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  // socket === client
  console.log("New WebSocket connection.");

  socket.on("join", ({ username, room }) => {
    socket.join(room);
    // socket.emit (send to single client)
    // socket.broadcast.emit (send to all clients except this socket)
    // io.to.emit (send event to all in this room)
    // socket.broadcast.to.emit (send to all except for this client in this room)
    // io.emit (to all clients)

    socket.emit("message", generateMessage("Welcome!"));
    socket.broadcast
      .to(room)
      .emit("message", generateMessage(`${username} has joined.`));
  });

  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed.");
    }
    io.to('Room1').emit("message", generateMessage(message)); // all messages will be sent to this room
    callback();
  });

  socket.on("sendLocation", (location, callback) => {
    io.emit(
      "locationMessage",
      generateLocationMessage(
        `https://google.com/maps?q=${location.lat},${location.long}`
      )
    );
    callback();
  });

  socket.on("disconnect", () => {
    io.emit("message", generateMessage("A user has left.")); // send to all clients
  });
});

server.listen(port, () => {
  console.log("server is up on port " + port);
});
