from flask import Flask, request, jsonify, Blueprint
from models import db, Reservation

reservation_bp = Blueprint("reservation_blueprint", __name__)

@reservation_bp.route("/reservations", methods=["POST"])
def make_reservation():
    data = request.get_json()

    user_id = data.get('user_id')
    restaurant_id = data.get('restaurant_id')
    date = data.get('date')
    party_size = data.get('party_size')

    if not all([user_id, restaurant_id, date, party_size]):
        return jsonify({"error": "User ID, Restaurant ID, Date, and Party Size are required!"}), 400

    new_reservation = Reservation(
        user_id=user_id,
        restaurant_id=restaurant_id,
        date=date,
        party_size=party_size
    )

    db.session.add(new_reservation)
    db.session.commit()

    return jsonify({"message": "Reservation created successfully!"}), 201

@reservation_bp.route("/reservations/<reservation_id>", methods=["GET"])
def get_reservation_details(reservation_id):
    reservation = Reservation.query.get(reservation_id)

    if not reservation:
        return jsonify({"error": "Reservation not found"}), 404

    reservation_info = {
        "id": reservation.id,
        "user_id": reservation.user_id,
        "restaurant_id": reservation.restaurant_id,
        "date": reservation.date,
        "party_size": reservation.party_size
    }

    return jsonify(reservation_info), 200

@reservation_bp.route("/reservations/<reservation_id>", methods=["PATCH"])
def update_reservation(reservation_id):
    reservation = Reservation.query.get(reservation_id)

    if not reservation:
        return jsonify({"error": "Reservation not found"}), 404

    data = request.get_json()

    reservation.date = data.get("date", reservation.date)
    reservation.party_size = data.get("party_size", reservation.party_size)

    db.session.commit()

    return jsonify({"message": "Reservation updated successfully!"}), 200

@reservation_bp.route("/reservations/<reservation_id>", methods=["DELETE"])
def cancel_reservation(reservation_id):
    reservation = Reservation.query.get(reservation_id)

    if not reservation:
        return jsonify({"error": "Reservation not found"}), 404

    db.session.delete(reservation)
    db.session.commit()

    return jsonify({"message": "Reservation canceled successfully!"}), 200