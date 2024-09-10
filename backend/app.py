from flask import Flask, request, jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from dotenv import load_dotenv
from flask_cors import CORS
import requests
import os

import utils as util

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///storage.db'
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")
app.config['PORT'] =  5000 if os.getenv("PORT") == None else os.getenv("PORT")

# Initialize extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
limiter = Limiter(get_remote_address, app=app, default_limits=["60 per day", "20 per hour"])

# User model for database
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

# Create database tables
with app.app_context():
    db.create_all()

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json(silent=True)
    if data == None:
        return jsonify({"error": "Unsupported Media Type: Could not accept request."}), 415

    # Validate Inputs
    if (util.validate_email(data['email']) != True):
        return jsonify({"message": "Invalid email"})
    if (util.validate_username(data['username']) != True):
        return jsonify({"message": "Username must include only letters, numbers, -, or _."})
    if (len(data['password']) < 6):
        return jsonify({"message": "Password must be 6 characters"})

    # Hash password and create new user in database
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(email=data['email'], username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    # Create jwt 
    access_token = create_access_token(identity=data['username'])
    return jsonify({"message": "User created successfully!", "access_token":access_token}), 201

@app.route('/login', methods=['POST'])
# @limiter.limit("6 per minute")
def login():
    # Parse request json
    data = request.get_json(silent=True)
    if data != None:
        # Get usertype this could be email or username
        user_type = data.get('user', None)
        if user_type == None or not isinstance(user_type, str):
            # usertype doesn't exist or is not a string
            return jsonify({"error": "Must provide 'user' key and value"}), 401
        
        query = None
        if "@" in user_type:
            # usertype is email. Validate and query database
            if util.validate_email(user_type):
                query = User.query.filter_by(email=user_type)
        else:
            # usertype is username. Validate and query database
            if util.validate_username(user_type):
                query = User.query.filter_by(username=user_type)

        # Execute query
        user = query.first() if query != None else None
        
        # Check user is validated and passwords match
        if user and bcrypt.check_password_hash(user.password, data['password']): #TODO data['password'] is not safe input
            access_token = create_access_token(identity=user.username)
            return jsonify({"message": "User login successful!", "username": user.username, "access_token":access_token})
        else:
            # User validation unsuccessful or incorrect password
            return jsonify({"message": "Incorrect user or password"})
    # Request could not be parsed
    return jsonify({"error": "Unsupported Media Type: Could not accept request."}), 415

# Route to fetch data from OpenLibrary API
@app.route('/search', methods=['GET'])
@jwt_required()
def get_book_data():
    book_name = request.args.get('book_name')
    response = requests.get(f"https://openlibrary.org/search.json?q={book_name}")
    if response.status_code == 200:
        return jsonify(response.json())
    return jsonify({"error": "Unable to fetch data"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=app.config.get('PORT'), debug=True)
