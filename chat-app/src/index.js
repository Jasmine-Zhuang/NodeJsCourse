const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const Filter = require("bad-words");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  // socket === client
  console.log("New WebSocket connection.");

  socket.emit("message", "Welcome!"); // send to single client
  socket.broadcast.emit("message", "A new user has joined."); // send to all clients except this socket

  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed.");
    }
    io.emit("message", message); // send to all clients
    callback();
  });

  socket.on("sendLocation", (location, callback) => {
    io.emit("locationMessage", `https://google.com/maps?q=${location.lat},${location.long}`);
    callback();
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user has left."); // send to all clients
  });
});

server.listen(port, () => {
  console.log("server is up on port " + port);
});
