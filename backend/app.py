from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SESSION_SECRET')
CORS(app)

if __name__ == '__main__':
    app.run(debug=True)