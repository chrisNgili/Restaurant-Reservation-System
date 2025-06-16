from flask import Flask, request, jsonify, Blueprint
from models import db, Restaurant

restaurant_bp = Blueprint("restaurant_blueprint", __name__)

@restaurant_bp.route("/restaurants", methods=["POST"])
def create_restaurant():
    data = request.get_json()

    name = data.get('name')
    location = data.get('location')
    contacts = data.get("contacts")
    description = data.get("description")

    if not name or not location or not contacts or not description:
        return jsonify({"error": "Name, Location, Contacts and Description are required!!"}), 400
    
    name_exists = Restaurant.query.filter_by(name=name).first()
    contacts_exists = Restaurant.query.filter_by(contacts=contacts).first()

    if name_exists:
        return jsonify({"error": "Restaurant name already exists"}), 400
    if contacts_exists:
        return jsonify({"error": "A restaurant already has these contacts"}), 400
    
    new_restaurant = Restaurant(name=name, location=location, contacts=contacts, description=description)
    db.session.add(new_restaurant)
    db.session.commit()

@restaurant_bp.route("/restaurants", methods=["GET"])
def get_all_restaurants():
    restaurants = Restaurant.query.all()

    restaurant_list = []
    for restaurant in restaurants:
        restaurant_info = {
            "id":restaurant.id,
            "name":restaurant.name,
            "location":restaurant.location,
            "contacts":restaurant.contacts,
            "description":restaurant.description
        }
        restaurant_list.append(restaurant_info)
    return jsonify(restaurant_list), 200

@restaurant_bp.route("/restaurants/<restaurant_id>", methods=["PATCH"])
def update_restaurant(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)

    if not restaurant:
        return jsonify({"error": "Restaurant not found"}), 404
    data = request.get_json()

    name = data.get("name", restaurant.name)
    location = data.get("location", restaurant.location)
    contacts = data.get("contacts", restaurant.contacts)
    description = data.get("description", restaurant.description)

    restaurant.name = name
    restaurant.location = location
    restaurant.contacts = contacts
    restaurant.description = description
    db.session.commit()

@restaurant_bp.route("/restaurants/<restaurant_id>", methods=["DELETE"])
def delete_restaurant(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)

    if not restaurant:
        return jsonify({"error": "Restaurant not found"}), 404
    
    db.session.delete(restaurant)
    db.session.commit()

    return jsonify({"success": "Restaurant Deleted!"}), 200

@restaurant_bp.route("/restaurants/<restaurant_id>", methods=["GET"])
def get_restaurants_by_id(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)

    if not restaurant:
        return jsonify({"error": "Restaurant not found"}), 404
    
    restaurant_info = {
        "id":restaurant.id,
        "name":restaurant.name,
        "location":restaurant.location,
        "contacts":restaurant.contacts,
        "description":restaurant.description
    }
    return jsonify(restaurant_info), 200