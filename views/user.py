from flask import Flask, request, jsonify, Blueprint
from models import db, User

user_bp = Blueprint("user_blueprint", __name__)


@user_bp.route("/users", method=["POST"])
def create_user():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    # password

    if not name or not email or not phone:
        return jsonify({"error": "Name, Email and Phone number are required!!"}), 400

    name_exists = User.query.filter_by(name=name).first()
    email_exists = User.query.filter_by(email=email).first()

    if name_exists:
        return jsonify({"error": "Name already exists!"}), 400
    
    if email_exists:
        return jsonify({"error": "Email already exists!"}), 400

    new_user = User(name=name, email=email, phone=phone)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"success": "User created successfully"}), 201

