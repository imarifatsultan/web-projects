const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

let users = {}; // Store usernames with their socket IDs

// When a user connects
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Listen for the 'set username' event
    socket.on('set username', (username) => {
        users[socket.id] = username;  // Save the username with the socket ID
        console.log(`${username} has joined the chat`);
    });

    // Listen for incoming messages and broadcast them
    socket.on('chat message', (data) => {
        io.emit('chat message', data);  // Send message with username to all clients
    });

    // When the user disconnects
    socket.on('disconnect', () => {
        console.log(`${users[socket.id]} disconnected`);
        delete users[socket.id]; // Remove the user from the list when they disconnect
    });
});

// Set up the server to listen on a specific port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

io.on('connection', (socket) => {
    socket.on('set username', (username) => {
        users[socket.id] = username;
        io.emit('update users', users);
    });

    socket.on('disconnect', () => {
        delete users[socket.id];
        io.emit('update users', users);
    });
});