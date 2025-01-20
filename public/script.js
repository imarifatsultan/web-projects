const socket = io();

const messageInput = document.getElementById('message-input');
const chatForm = document.getElementById('chat-form');
const messages = document.getElementById('messages');

// Send a message when the form is submitted
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = messageInput.value;
    if (message.trim() !== '') {
        socket.emit('chat message', message);  // Send message to server
        messageInput.value = '';  // Clear the input field
    }
});

// Listen for incoming messages and display them
socket.on('chat message', (msg) => {
    const messageElement = document.createElement('p');
    messageElement.textContent = msg;
    messages.appendChild(messageElement);

    // Scroll to the bottom to show the latest message
    messages.scrollTop = messages.scrollHeight;
});
