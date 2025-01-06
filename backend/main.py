from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Retrieve environment variables
BASE_API_URL = os.getenv("BASE_API_URL")
LANGFLOW_ID = os.getenv("LANGFLOW_ID")
FLOW_ID = os.getenv("FLOW_ID")
APPLICATION_TOKEN = os.getenv("APPLICATION_TOKEN")

# Flask app setup
app = Flask(__name__)
CORS(app)


def run_flow(message, tweaks=None):
    """Run the Langflow API with the provided message and optional tweaks."""
    api_url = f"{BASE_API_URL}/lf/{LANGFLOW_ID}/api/v1/run/{FLOW_ID}"

    payload = {
        "input_value": message,
        "output_type": "chat",
        "input_type": "chat",
    }

    if tweaks:
        payload["tweaks"] = tweaks

    headers = {
        "Authorization": f"Bearer {APPLICATION_TOKEN}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(api_url, json=payload, headers=headers)
        response.raise_for_status()  # Raise exception for HTTP errors
        return response.json()
    except requests.exceptions.RequestException as e:
        raise Exception(f"API request failed: {e}")
    except Exception as e:
        raise Exception(f"An error occurred: {e}")

@app.route('/')
def home():
    return jsonify({"Message":"Welcome Chief its working"})

@app.route('/chat', methods=['POST'])
def chat():
    """Handle chat requests."""
    data = request.get_json()
    message = data.get("message", "")
    tweaks = data.get("tweaks", {})

    if not message:
        return jsonify({"error": "Message is required"}), 400

    try:
        response = run_flow(message, tweaks)
        # Only extract and return relevant information for a cleaner response
        chat_output = response.get("outputs", [{}])[0].get("outputs", [{}])[0].get("artifacts", {}).get("message", "")
        return jsonify({"reply": chat_output})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
