from flask import Flask, request, jsonify, Blueprint
from models import db, User
# from flask_mail import Message
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth_blueprint", __name__)


@auth_bp.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get('password', None)

    if not email or not password:
        return jsonify({"error": "Email and Password are required!!"}), 400
    
    client = User.query.filter_by(email=email).first()

    if email and check_password_hash(client.password, password):
        access_token = create_access_token(identity=client.id)
        return jsonify(access_tokent=access_token)


    else:    
        return jsonify({"error": "Email not registered"}), 400
    
