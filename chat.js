// Function to send a message
function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return; // Prevent sending empty messages

    var chatMessages = document.getElementById("chat-messages");

    // Display user's message
    var messageDiv = document.createElement("div");
    messageDiv.textContent = userInput;
    messageDiv.className = "user-message";
    chatMessages.appendChild(messageDiv);
    document.getElementById("user-input").value = "";

    // Check if the message is a greeting
    if (isGreeting(userInput)) {
        var greetingResponse = "Hello! How can I assist you today?";
        displayBotMessage(greetingResponse);
        return;
    }

    // Make AJAX request to backend server
    fetch("http://localhost:3000/webhook", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        // Display bot response in chat
        var botMessageDiv = document.createElement("div");
        botMessageDiv.className = "bot-message";
        
        var botProfilePic = document.createElement("img");
        botProfilePic.src = "Afric.jpg"; // Replace with your bot's profile picture
        botProfilePic.alt = "Bot Profile Picture";
        botProfilePic.className = "bot-profile-pic";
        
        botMessageDiv.appendChild(botProfilePic);
        botMessageDiv.innerHTML += data.response; // Append the response content

        chatMessages.appendChild(botMessageDiv);
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

document.getElementById("send-button").addEventListener("click", sendMessage);

document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});