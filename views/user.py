from flask import Flask, request, jsonify, Blueprint
from models import db, User, Reservation, Review
from flask_mail import Message
from werkzeug.security import generate_password_hash

user_bp = Blueprint("user_blueprint", __name__)

from app import app, mail

@user_bp.route("/users", methods=["POST"])
def create_user():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    password = data.get("password")

    if not name or not email or not phone or not password:
        return jsonify({"error": "Name, Email, Password and Phone number are required!!"}), 400

    name_exists = User.query.filter_by(name=name).first()
    email_exists = User.query.filter_by(email=email).first()

    if name_exists:
        return jsonify({"error": "Name already exists!"}), 400
    
    if email_exists:
        return jsonify({"error": "Email already exists!"}), 400

    new_user = User(name=name, email=email, phone=phone, password = generate_password_hash(password))
    db.session.add(new_user)

    try:
        msg = Message(subject="Welcome to Restaurant Reservation",
        recipients=[email],
        sender=app.config['MAIL_DEFAULT_SENDER'],
        body=f"Hello {name},\n\nThank you for creating your account on our platform!\n\nBest regards,\nRR Team")
        mail.send(msg)        
        db.session.commit()
        return jsonify({"success":"User created successfully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to regsiter/send welcome email"}), 400

@user_bp.route("/users/<int:user_id>", methods=["PATCH"])
def update_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404
    
    data = request.get_json()
    
    name = data.get("name", user.name)
    email = data.get("email", user.email)
    phone = data.get("phone", user.phone)
    is_admin = data.get("is_admin", user.is_admin)

    user.name = name
    user.email = email
    user.phone = phone
    user.is_admin = is_admin
    db.session.commit()
    return jsonify({"success": "User updated"}), 200

@user_bp.route("/users/int:<user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    user_info = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "is_admin": user.is_admin
    }

    return jsonify(user_info), 200

@user_bp.route("/users", methods=["GET"])
def get_all_users():
    users = User.query.all()

    user_list = []
    for user in users:
        user_info = {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "is_admin": user.is_admin
        }
        user_list.append(user_info)

    return jsonify(user_list), 200

@user_bp.route("/users/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"success": "User deleted successfully"}), 200


@user_bp.route("/users/<int:user_id>/reservations", methods=["GET"])
def user_reservations(user_id):
    def get_reservations(user_id):
        reservations = Reservation.query.filter_by(user_id=user_id).all()
        return reservations
    
    reservations = get_reservations(user_id)
    return jsonify([{"id": res.id, "party_size": res.party_size, "status": res.status, "restaurant_id": res.restaurant_id} for res in reservations])

@user_bp.route("/users/<int:user_id>/reviews", methods=["GET"])
def user_reviews(user_id):
    def get_reviews(user_id):
        reviews = Review.query.filter_by(user_id=user_id).all()
        return reviews
    
    reviews = get_reviews(user_id)
    return jsonify([{"id": rev.id, "rating":rev.rating, "comment": rev.comment, "date":rev.date} for rev in reviews])