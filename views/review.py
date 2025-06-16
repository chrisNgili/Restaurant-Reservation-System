from flask import Flask, request, jsonify, Blueprint
from models import db, Review

review_bp = Blueprint("review_blueprint", __name__)

@review_bp.route("/restaurants/<restaurant_id>/reviews", methods=["POST"])
def add_review(restaurant_id):
    data = request.get_json()

    user_id = data.get('user_id')
    rating = data.get('rating')
    comment = data.get('comment')

    if not all([user_id, rating, comment]):
        return jsonify({"error": "User ID, Rating, and Comment are required!"}), 400

    new_review = Review(
        user_id=user_id,
        restaurant_id=restaurant_id,
        rating=rating,
        comment=comment
    )

    db.session.add(new_review)
    db.session.commit()

    return jsonify({"message": "Review added successfully!"}), 201

@review_bp.route("/restaurants/<restaurant_id>/reviews", methods=["GET"])
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

@review_bp.route("/reviews/<review_id>", methods=["PATCH"])
def update_review(review_id):
    review = Review.query.get(review_id)

    if not review:
        return jsonify({"error": "Review not found"}), 404

    data = request.get_json()

    review.rating = data.get("rating", review.rating)
    review.comment = data.get("comment", review.comment)

    db.session.commit()

    return jsonify({"message": "Review updated successfully!"}), 200

@review_bp.route("/reviews/<review_id>", methods=["DELETE"])
def delete_review(review_id):
    review = Review.query.get(review_id)

    if not review:
        return jsonify({"error": "Review not found"}), 404

    db.session.delete(review)
    db.session.commit()

    return jsonify({"message": "Review deleted successfully!"}), 200