async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (!userInput) return;

    // Display user message
    const chatbox = document.getElementById('chatbox');
    chatbox.innerHTML += `<div class="user-message">${userInput}</div>`;
    chatbox.scrollTop = chatbox.scrollHeight;

    // Send to backend
    const response = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput })
    });
    const data = await response.json();

    // Display bot response
    chatbox.innerHTML += `<div class="bot-message">${data.response}</div>`;
    chatbox.scrollTop = chatbox.scrollHeight;

    // Clear input
    document.getElementById('userInput').value = '';
}