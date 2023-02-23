const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { 
    cors: {origin: ["http://localhost:3000", "http://wednesdaygallo.com/chat-app"]},
    methods: [ "GET", "POST"]
});

const port = process.env.PORT || 3001;


io.on('connection', (socket) => {
    const user_id = Date.now();

    console.log(`user ${user_id} connected`);

    socket.on('sendMessage', (message) => {
        console.log(`user: ${message.user} - message: ${message.message}`);

        const newMessage = {
            user: message.user,
            message: message.message,
            key: Date.now()
        }

        io.emit('receiveMessage', newMessage);
    })

    socket.on('disconnect', () => {
        console.log(`user ${user_id} disconnected`);
    })
});

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});