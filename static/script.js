async function sendMessage() {
    const userInput = document.getElementById('userInput').value.trim();
    if (!userInput) return;

    const chatbox = document.getElementById('chatbox');
    chatbox.innerHTML += `<div class="user-message">${userInput}</div>`;
    chatbox.scrollTop = chatbox.scrollHeight;

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userInput })
        });
        const data = await response.json();
        const botMessage = data.response || data.error || 'Error communicating with server.';
        chatbox.innerHTML += `<div class="bot-message">${botMessage}</div>`;
        chatbox.scrollTop = chatbox.scrollHeight;
    } catch (error) {
        chatbox.innerHTML += `<div class="bot-message">Error: ${error.message}</div>`;
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    document.getElementById('userInput').value = '';
}

document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});