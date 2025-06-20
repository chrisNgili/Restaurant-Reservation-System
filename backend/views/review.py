from flask import Flask, request, jsonify, Blueprint
from flask_jwt_extended import get_jwt_identity, jwt_required
from models import db, Review

review_bp = Blueprint("review_blueprint", __name__)

@review_bp.route("/restaurants/<int:restaurant_id>/reviews", methods=["POST"])
@jwt_required()
def add_review(restaurant_id):
    current_user = get_jwt_identity()
    data = request.get_json()

    rating = data.get('rating')
    comment = data.get('comment')

    if not all([rating, comment]):
        return jsonify({"error": "User ID, Rating, and Comment are required!"}), 400

    new_review = Review(
        user_id=current_user,
        restaurant_id=restaurant_id,
        rating=rating,
        comment=comment
    )

    db.session.add(new_review)
    db.session.commit()

    return jsonify({"message": "Review added successfully!"}), 201

@review_bp.route("/restaurants/<int:restaurant_id>/reviews", methods=["GET"])
def get_reviews(restaurant_id):
    reviews = Review.query.filter_by(restaurant_id=restaurant_id).all()

    review_list = []
    for review in reviews:
        review_info = {
            "id": review.id,
            "user_id": review.user_id,
            "rating": review.rating,
            "comment": review.comment
        }
        review_list.append(review_info)

    return jsonify(review_list), 200

@review_bp.route("/reviews/<int:review_id>", methods=["PATCH"])
@jwt_required()
def update_review(review_id):
    current_user = get_jwt_identity()
    review = Review.query.get(review_id)

    if not review:
        return jsonify({"error": "Review not found"}), 404
    
    if review.user_id != current_user:
        return jsonify({"error": "Unauthorised access, log in first!"})  

    data = request.get_json()

    review.rating = data.get("rating", review.rating)
    review.comment = data.get("comment", review.comment)

    db.session.commit()

    return jsonify({"message": "Review updated successfully!"}), 200

@review_bp.route("/reviews/<int:review_id>", methods=["DELETE"])
@jwt_required()
def delete_review(review_id):
    current_user = get_jwt_identity()
    review = Review.query.get(review_id)

    if not review:
        return jsonify({"error": "Review not found"}), 404
    
    if review.user_id != current_user:
        return jsonify({"error": "Unauthorised access, log in first!"})

    db.session.delete(review)
    db.session.commit()

    return jsonify({"message": "Review deleted successfully!"}), 200