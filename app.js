// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Sample data (replace with your actual data)
const faqs = [
    { question: "What is your name?", answer: "According to my maker Justice, My name is Ama, How may i assist you today?." },
    { question: "What are Chuchu Softies sanitary pads made of?", answer: "Chuchu Softies pads are made of reusable ultra modern materials." },
    { question: "How do I use and care for reusable pads?", answer: "Using and caring for reusable pads is simple. Detailed care instructions are provided with each purchase." },
    { question: "What is ChuChu Softies?", answer: "ChuChu Softies is a company dedicated to providing sustainable menstrual hygiene solutions to curb period poverty. Our high-quality reusable pads are designed for women seeking eco-friendly and comfortable alternatives." },
    { question: "What problem does ChuChu Softies address?", answer: "Accessing affordable and sustainable menstrual hygiene products can be challenging for many girls and women in some rural areas. ChuChu Softies addresses this issue by offering reusable pads that prioritise sustainability without compromising quality." },
    { question: "What products does ChuChu Softies offer?", answer: "ChuChu Softies manufactures top-quality reusable sanitary pads. Our products are designed to be eco-friendly, comfortable, and sustainable in a way that empowers women to choose sustainable menstrual products confidently." },
    { question: "Do you donate sanitary pads?", answer: "We primarily sell our pads. However, we donate sanitary pads when funded by a donor or an agency." },
    { question: "Why choose reusable pads from ChuChu Softies?", answer: "Our reusable pads are eco-friendly and cost-effective but also comfortable and durable. By choosing our pads, you reduce waste and support sustainable menstrual hygiene practices." },
    { question: "Where can I buy ChuChu Softies pads?", answer: "Click on the button to place your order. <button class='buy-now-button' onclick=\"window.location.href='https://docs.google.com/forms/d/e/1FAIpQLSe1kfsMf1YD6we1mxfHTNyN5TZMEsHU-lBGJhDc7_2OCPMMEA/viewform'\">Buy Now</button>" },
    { question: "How can I become a distributor for ChuChu Softies?", answer: "We welcome partnerships with individuals and organizations that share our vision. If you are interested in becoming a distributor, please contact us through the button <button class='partner' onclick=\"window.location.href='https://docs.google.com/forms/d/e/1FAIpQLSdxcie1yjm26_LjYtsxwZHYYA--50PeoqsT8NpKWbPpPuNXEw/viewform'\">Partner</button>" },
    { question: "Are ChuChu Softies pads available internationally?", answer: "Yes, our reusable pads are available for purchase internationally. We offer shipping to various countries. Please refer to our order form to place your order. <button class='world' onclick=\"window.location.href='https://docs.google.com/forms/d/e/1FAIpQLSe1kfsMf1YD6we1mxfHTNyN5TZMEsHU-lBGJhDc7_2OCPMMEA/viewform'\">Buy Now</button>" },
    { question: "How can I get involved with ChuChu Softies?", answer: "You can get involved by purchasing our products, spreading the word about our mission, or partnering with us. We also welcome donations and sponsorships to help fund our initiatives." },
];

// Create an instance of Express
const app = express();

// Middleware to parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a GET route for the root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the chatbot server!');
});

// Configure CORS
app.use(cors());

// Define a POST route to handle incoming messages from the chat widget
app.post('/webhook', (req, res) => {
    // Extract the user's message from the request body
    const userMessage = req.body.message;

    // Process the user's message and generate bot's response
    let botResponse;
    if (isGreeting(userMessage)) {
        // If the user's message is a greeting, provide a custom greeting
        botResponse = "Welcome, My Name is Ama! How may I assist you?";
    } else {
        // If the user's message is a question, find the corresponding answer from the FAQ data
        botResponse = processQuestion(userMessage);
    }
    // Send the bot's response back to the chat widget
    res.json({ response: botResponse });
});

// Function to check if the user's message is a greeting
function isGreeting(message) {
    return ["hello", "hi", "hey", "greetings"].includes(message.toLowerCase());
}

// Function to process user's question and generate bot's response
function processQuestion(question) {
    // Find the matching FAQ based on the user's question
    const faq = faqs.find(faq => faq.question.toLowerCase() === question.toLowerCase());

    // If FAQ found, return the corresponding answer. Otherwise, return a default response.
    return faq ? faq.answer : "Sorry, I couldn't find an answer to your question, Please reach out to our agents via the GET IN TOUCH button on the Contact Page.";
}

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});