from flask import Flask, request, jsonify, send_from_directory
import requests

app = Flask(__name__, static_folder='static', static_url_path='/')

RASA_URL = "http://localhost:5005/webhooks/rest/webhook"

@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json.get('message')
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400
        response = requests.post(RASA_URL, json={"sender": "user", "message": user_message}, timeout=5)
        response.raise_for_status()
        rasa_response = response.json()
        bot_message = rasa_response[0]['text'] if rasa_response else "Sorry, I don't understand."
        return jsonify({'response': bot_message})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)