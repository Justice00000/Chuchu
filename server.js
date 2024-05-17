// Function to open the chat widget
function openChat() {
    var chatWidget = document.getElementById("chat-widget");
    chatWidget.style.display = "block";
}

// Function to close the chat widget
document.getElementById("close-button").addEventListener("click", function() {
    var chatWidget = document.getElementById("chat-widget");
    chatWidget.style.display = "none";
});