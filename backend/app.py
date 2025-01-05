from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Langflow API configuration
BASE_API_URL = "https://api.langflow.astra.datastax.com"
LANGFLOW_ID = "25fe5150-aa1d-4633-8724-de019b85d6d7"
FLOW_ID = "1209685b-0f7a-4ad1-9d32-6917776baff5"
APPLICATION_TOKEN = "AstraCS:DWJupwfZqcLlyENixmmfefsb:2e8f204411c22db0b19a09b653272a5ed73e4cfd5b51b292ce0785335817cb45"

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
        return jsonify({"response": chat_output})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__": 
    app.run(debug=True)
