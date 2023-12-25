const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('createRoom', () => {
        const roomId = generateRoomId();
        socket.join(roomId);
        io.to(socket.id).emit('roomCreated', roomId);
    });

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        io.to(roomId).emit('playerJoined', socket.id); // Notify others in the room
    });

    // Handle other events like 'startGame', 'draw', 'guess', etc.

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

function generateRoomId() {
    return Math.random().toString(36).substr(2, 9);
}
