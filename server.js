const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// When a user connects
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for incoming messages and broadcast them
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);  // Send message to all clients
    });

    // When the user disconnects
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Set up the server to listen on a specific port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
