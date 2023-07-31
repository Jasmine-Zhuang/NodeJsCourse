const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  /* options */
});

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log('New WebSocket connection')
});

server.listen(port, () => {
  console.log("server is up on port " + port);
});
