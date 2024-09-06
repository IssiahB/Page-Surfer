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
    data = request.get_json()

    # Validate Input
    if (util.validate_email(data['email']) != True):
        return jsonify({"message": "Invalid Email"}), 401
    if (util.validate_username(data['username']) != True):
        return jsonify({"message": "Invalid Username"}), 401
    if (data['password'] < 6):
        return jsonify({"message": "Password Too Short"}), 401

    # Hash password and create new user in database
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(email=data['email'], username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    # Create jwt 
    access_token = create_access_token(identity=data['username'])
    return jsonify({"message": "User created successfully!", "access_token":access_token}), 201

@app.route('/login', methods=['POST'])
@limiter.limit("6 per minute")
def login():
    data = request.get_json()
    email_login = True if data.get('login_type', None) == 'email' else False

    if email_login:
        user = User.query.filter_by(email=data['email']).first()
    else:
        user = User.query.filter_by(username=data['username']).first()

    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.username)
        return jsonify({"message": "User login successful!", "username": user.username, "access_token":access_token})
    return jsonify({"error": "Invalid credentials"}), 401

# Route to fetch data from OpenLibrary API
@app.route('/openlibrary', methods=['GET'])
@jwt_required()
def get_book_data():
    book_name = request.args.get('book_name')
    response = requests.get(f"https://openlibrary.org/search.json?q={book_name}")
    if response.status_code == 200:
        return jsonify(response.json())
    return jsonify({"error": "Unable to fetch data"}), 500

if __name__ == '__main__':
    app.run(debug=True)
