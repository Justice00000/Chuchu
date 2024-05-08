function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  document.getElementById('tracker-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    const lastPeriodDate = document.getElementById('last-period-date').value;
    const cycleLength = parseInt(document.getElementById('cycle-length').value);
    
    // Calculate next period start date
    const nextPeriodDate = new Date(lastPeriodDate);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);
    
    // Display tracker information
    const trackerInfo = document.getElementById('tracker-info');
    trackerInfo.innerHTML = `
      <h3>Tracker Information</h3>
      <p>Last Period Start Date: ${lastPeriodDate}</p>
      <p>Average Cycle Length: ${cycleLength} days</p>
      <p>Predicted Next Period Start Date: ${nextPeriodDate.toDateString()}</p>
    `;
  });

  document.addEventListener('DOMContentLoaded', function() {
    var menuToggle = document.getElementById('menu-toggle');
    var navItems = document.querySelector('.nav');
    var menuIcon = document.querySelector('.menu-icon');

    menuToggle.addEventListener('change', function() {
        if (menuToggle.checked) {
            navItems.style.display = 'block'; // Show nav items
            menuIcon.style.display = 'none'; // Hide menu icon
        } else {
            navItems.style.display = 'none'; // Hide nav items
            menuIcon.style.display = 'inline'; // Show menu icon
        }
    });
});

// script.js
function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();
  if (message !== '') {
    appendMessage('user', message);
    // Call function to send message to backend and handle response
    // For simplicity, let's just log the response for now
    console.log('User message:', message);
    messageInput.value = '';
  }
}

function appendMessage(sender, text) {
  const chatBox = document.getElementById('chat-box');
  const messageDiv = document.createElement('div');
  const messageText = document.createElement('span');
  messageText.textContent = text;
  messageDiv.appendChild(messageText);
  messageDiv.classList.add('chat-message');
  messageDiv.classList.add(`${sender}-message`);
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Array to store chat messages
let chatHistory = [];

// Route to handle incoming messages from users
app.post('/user-message', (req, res) => {
  const { message } = req.body;
  if (message.trim() !== '') {
    // Add user message to chat history
    chatHistory.push({ sender: 'user', text: message });
    // Process user message (you can implement your logic here)
    // For now, let's just log the message
    console.log('User message:', message);
    res.status(200).send('Message received');
  } else {
    res.status(400).send('Invalid message');
  }
});

// Route to handle incoming messages from agents
app.post('/agent-message', (req, res) => {
  const { message } = req.body;
  if (message.trim() !== '') {
    // Add agent message to chat history
    chatHistory.push({ sender: 'agent', text: message });
    // Process agent message (you can implement your logic here)
    // For now, let's just log the message
    console.log('Agent message:', message);
    res.status(200).send('Message received');
  } else {
    res.status(400).send('Invalid message');
  }
});

// Route to get the chat history
app.get('/chat-history', (req, res) => {
  res.json(chatHistory);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
