from flask import Flask, request, jsonify, Blueprint
from models import db, User, TokenBlocklist
# from flask_mail import Message
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from datetime import datetime
from datetime import timezone

auth_bp = Blueprint("auth_blueprint", __name__)


@auth_bp.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get('password', None)

    if not email or not password:
        return jsonify({"error": "Email and Password are required!!"}), 400
    
    client = User.query.filter_by(email=email).first()

    if email and client and check_password_hash(client.password, password):
        access_token = create_access_token(identity=client.id)
        return jsonify(access_token=access_token)


    else:    
        return jsonify({"error": "Email not registered"}), 400
    

@auth_bp.route("/logged_in", methods=["GET"])
@jwt_required()
def fetch_logged_in():
    current_user = get_jwt_identity()

    user = User.query.get(current_user)

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
    
@auth_bp.route("/logout", methods=["DELETE"])
@jwt_required()
def modify_token():
    jti = get_jwt()["jti"]
    now = datetime.now(timezone.utc)

    logout_token =TokenBlocklist(jti=jti, created_at=now)
    db.session.add(logout_token)
    db.session.commit()
    return jsonify({"success": "Successfully logged out"}), 200