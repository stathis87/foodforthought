const express = require('express');
const app = express();
//we are adding the server name we want our app to look for 
const server = app.listen(9100);
const socket = require('socket.io');
//we are hosting the static files in public directory
app.use(express.static('public'));

let io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('new connection: ' + socket.id);

// function sendText (data) {
//     socket.broadcast.emit("message", data);
//     console.log(data);
//}

socket.on('ingredient', receiveMsg);

function receiveMsg (data) {
    socket.broadcast.emit('ingredient', data);
    //if we want to send it to any client
    //io.socket.emit('ingredient', data)
    console.log(data);
}

};


//socket.on

//runs when client disconnects
// socket.on('disconnect', () => {
//     io.emit('message', 'the user left');
// }) ;

console.log("my socket server is running");

