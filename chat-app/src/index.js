const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  /* options */
});

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

let count = 0;

io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  socket.emit("countUpdated", count);
  socket.on('increment', () => {
    count++;
    // socket.emit('countUpdated', count);

    // emit to all connections
    io.emit('countUpdated', count);
  })
});

server.listen(port, () => {
  console.log("server is up on port " + port);
});
