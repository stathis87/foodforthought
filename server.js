const express = require('express');
const app = express();
//we are adding the server name we want our app to look for 
const server = app.listen(5000);
const socket = require('socket.io');
//we are hosting the static files in public directory
app.use(express.static('public'));

let io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('new connection: ' + socket.id);

function sendText (data) {
    socket.broadcast.emit("textA", data);
    console.log(data);
}
}
socket.on

console.log("my socket server is running");

