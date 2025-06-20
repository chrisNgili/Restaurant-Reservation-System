from flask import Flask, request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from models import db, Reservation

reservation_bp = Blueprint("reservation_blueprint", __name__)

@reservation_bp.route("/reservations", methods=["POST"])
@jwt_required()
def make_reservation():
    data = request.get_json()
    current_user = get_jwt_identity()

    restaurant_id = data.get('restaurant_id')
    date_str = data.get('date')
    party_size = data.get('party_size')

    if not all([restaurant_id, date_str, party_size]):
        return jsonify({"error": "Restaurant ID, Date, and Party Size are required!"}), 400
    
    try:
        date = datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        return jsonify({"error": "Invalid date format. Please use YYYY-MM-DD."}), 400

    new_reservation = Reservation(
        user_id=current_user,
        restaurant_id=restaurant_id,
        date=date,
        party_size=party_size
    )

    db.session.add(new_reservation)
    db.session.commit()

    return jsonify({"message": "Reservation created successfully!"}), 201

@reservation_bp.route("/reservations/<int:reservation_id>", methods=["GET"])
def get_reservation_details(reservation_id):
    current_user = get_jwt_identity()
    reservation = Reservation.query.get(reservation_id)

    if not reservation:
        return jsonify({"error": "Reservation not found"}), 404
    
    if reservation.user_id != current_user:
        return jsonify({"error": "Unauthorised access, log in first!"})

    reservation_info = {
        "id": reservation.id,
        "user_id": reservation.user_id,
        "restaurant_id": reservation.restaurant_id,
        "date": reservation.date,
        "party_size": reservation.party_size
    }

    return jsonify(reservation_info), 200

@reservation_bp.route("/reservations/<int:reservation_id>", methods=["PATCH"])
@jwt_required()
def update_reservation(reservation_id):
    current_user = get_jwt_identity()
    reservation = Reservation.query.get(reservation_id)

    if not reservation:
        return jsonify({"error": "Reservation not found"}), 404

    if reservation.user_id != current_user:
        return jsonify({"error": "Unauthorised access, log in first!"})

    data = request.get_json()

    date_str = data.get("date")
    if date_str:
        try:
            reservation.date = datetime.strptime(date_str, "%Y-%m-%d")
        except ValueError:
            return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400

    party_size = data.get("party_size")
    if party_size is not None:
        reservation.party_size = party_size

    db.session.commit()

    return jsonify({"message": "Reservation updated successfully!"}), 200

@reservation_bp.route("/reservations/<int:reservation_id>", methods=["DELETE"])
@jwt_required()
def cancel_reservation(reservation_id):
    current_user = get_jwt_identity()
    reservation = Reservation.query.get(reservation_id)

    if not reservation:
        return jsonify({"error": "Reservation not found"}), 404

    if reservation.user_id != current_user:
        return jsonify({"error": "Unauthorised access, log in first!"})

    db.session.delete(reservation)
    db.session.commit()

    return jsonify({"message": "Reservation canceled successfully!"}), 200