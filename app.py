from flask import Flask, request, jsonify
import requests

app = Flask(__name__, static_folder='static', static_url_path='/')

RASA_URL = "http://localhost:5005/webhooks/rest/webhook"

@app.route('/')
def serve_frontend():
    return app.send_static_file('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    response = requests.post(RASA_URL, json={"sender": "user", "message": user_message})
    rasa_response = response.json()
    bot_message = rasa_response[0]['text'] if rasa_response else "Sorry, I don't understand."
    return jsonify({'response': bot_message})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)