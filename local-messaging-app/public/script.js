const socket = io();

const signupContainer = document.getElementById('signup-container');
const chatContainer = document.getElementById('chat-container');
const signupForm = document.getElementById('signup-form');
const messageInput = document.getElementById('message-input');
const chatForm = document.getElementById('chat-form');
const messages = document.getElementById('messages');

let username = '';

// Handle user signup
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    username = document.getElementById('username').value.trim();

    if (username) {
        // Hide the signup form and show the chat container
        signupContainer.style.display = 'none';
        chatContainer.style.display = 'block';
        
        // Emit the username to the server
        socket.emit('set username', username);
    } else {
        alert("Please enter a valid name!");
    }
});

// Send a message when the form is submitted
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = messageInput.value.trim();
    if (message && username) {
        // Emit the message along with the username
        socket.emit('chat message', { username, message });
        messageInput.value = '';  // Clear the input field
    }
});

// Listen for incoming messages and display them
socket.on('chat message', (data) => {
    const messageElement = document.createElement('p');
    messageElement.textContent = `${data.username}: ${data.message}`;
    messages.appendChild(messageElement);

    // Scroll to the bottom to show the latest message
    messages.scrollTop = messages.scrollHeight;
});

socket.on('update users', (users) => {
    const userList = document.getElementById('users');
    userList.innerHTML = '';
    Object.values(users).forEach((username) => {
        const userElement = document.createElement('li');
        userElement.textContent = username;
        userList.appendChild(userElement);
    });
});