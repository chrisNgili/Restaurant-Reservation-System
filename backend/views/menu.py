from flask import Flask, request, jsonify, Blueprint
from flask_jwt_extended import jwt_required
from .admin import admin_required
from models import db, Menu

menu_bp = Blueprint("menu_blueprint", __name__)

@menu_bp.route("/restaurants/<int:restaurant_id>/menu", methods=["GET"])
def get_menu_items(restaurant_id):
    menu_items = Menu.query.filter_by(restaurant_id=restaurant_id).all()

    menu_list = []
    for item in menu_items:
        menu_info = {
            "id": item.id,
            "item_name": item.item_name,
            "description": item.description,
            "price": item.price
        }
        menu_list.append(menu_info)

    return jsonify(menu_list), 200

@menu_bp.route("/restaurants/<int:restaurant_id>/menu", methods=["POST"])
@jwt_required()
@admin_required
def add_menu_item(restaurant_id):
    data = request.get_json()

    item_name = data.get('item_name')
    description = data.get('description')
    price = data.get('price')

    if not all([item_name, description, price]):
        return jsonify({"error": "item_name, Description, and Price are required!"}), 400

    new_menu_item = Menu(
        restaurant_id=restaurant_id,
        item_name=item_name,
        description=description,
        price=price
    )

    db.session.add(new_menu_item)
    db.session.commit()

    return jsonify({"message": "Menu item added successfully!"}), 201

@menu_bp.route("/menu/<int:menu_item_id>", methods=["PATCH"])
@jwt_required()
@admin_required
def update_menu_item(item_id):
    item = Menu.query.get(item_id)

    if not item:
        return jsonify({"error": "Menu item not found"}), 404

    data = request.get_json()

    item.item_name = data.get("item_name", item.item_name)
    item.description = data.get("description", item.description)
    item.price = data.get("price", item.price)

    db.session.commit()

    return jsonify({"message": "Menu item updated successfully!"}), 200

@menu_bp.route("/menu/<int:item_id>", methods=["DELETE"])
@jwt_required()
@admin_required
def delete_menu_item(item_id):
    menu_item = Menu.query.get(item_id)

    if not menu_item:
        return jsonify({"error": "Menu item not found"}), 404

    db.session.delete(menu_item)
    db.session.commit()

    return jsonify({"message": "Menu item deleted successfully!"}), 200