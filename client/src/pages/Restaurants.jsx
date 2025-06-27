import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { api_url } from "../config.json";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

export default function Restaurant() {
  const { id } = useParams();
  const { auth_token } = useContext(UserContext);
  const [restaurant, setRestaurant] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetch(`${api_url}/restaurants`)
      .then((res) => res.ok ? res.json() : Promise.reject(res))
      .then(setRestaurants)
      .catch((err) => {
        console.error("Error fetching restaurants:", err);
        toast.error("Failed to fetch restaurants");
      });

    if (id) {
      fetch(`${api_url}/restaurants/${id}`)
        .then((res) => res.ok ? res.json() : Promise.reject(res))
        .then(setRestaurant)
        .catch((err) => {
          console.error("Error fetching restaurant details:", err);
          toast.error("Failed to fetch restaurant details");
        });

      fetch(`${api_url}/restaurants/${id}/reviews`)
        .then((res) => res.ok ? res.json() : Promise.reject(res))
        .then(setReviews)
        .catch((err) => {
          console.error("Error fetching reviews:", err);
          toast.error("Failed to fetch reviews");
        });

      fetch(`${api_url}/restaurants/${id}/menu`)
        .then((res) => res.ok ? res.json() : Promise.reject(res))
        .then(setMenuItems)
        .catch((err) => {
          console.error("Error fetching menu items:", err);
          toast.error("Failed to fetch menu");
        });
    }
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!auth_token) {
      toast.error("Please sign in to leave a review");
      return;
    }

    fetch(`${api_url}/restaurants/${id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth_token}`
      },
      body: JSON.stringify({ rating, comment })
    })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(() => {
        toast.success("Review submitted successfully!");
        setRating(1);
        setComment("");
        fetch(`${api_url}/restaurants/${id}/reviews`)
          .then(res => res.ok ? res.json() : Promise.reject(res))
          .then(setReviews)
          .catch((err) => {
            console.error("Error refreshing reviews:", err);
            toast.error("Failed to refresh reviews");
          });
      })
      .catch((err) => {
        console.error("Error submitting review:", err);
        toast.error("Failed to submit review");
      });
  };

  if (id && !restaurant) return <div>Loading...</div>;

  if (id && restaurant) {
    return (
      <div className="min-h-screen bg-[#FAF4EF] flex flex-col items-center py-12 px-4">
        <div className="bg-white border border-amber-100 rounded-2xl shadow-lg p-8 w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">{restaurant.name}</h2>
          <p className="text-gray-700 mb-2">{restaurant.description}</p>
          <p className="text-gray-700 mb-1">
            <span className="font-medium text-amber-800">Location:</span> {restaurant.location}
          </p>
          <p className="text-gray-700 mb-6">
            <span className="font-medium text-amber-800">Contact:</span> {restaurant.contacts}
          </p>

          <Link
            to="/restaurants"
            className="inline-block text-sm font-semibold text-amber-700 hover:underline hover:text-amber-900 transition"
          >
            ← Back to Restaurants
          </Link>
        </div>

        <div className="w-full max-w-2xl mt-10">
          <h3 className="text-2xl font-bold text-amber-800 mb-4 font-mono">Menu</h3>
          {menuItems.length === 0 ? (
            <p className="text-gray-500">No menu items available.</p>
          ) : (
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <li key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold text-amber-900">{item.item_name}</p>
                    <p className="text-sm text-amber-600">KES {item.price}</p>
                  </div>
                  <p className="text-gray-700 text-sm mt-1">{item.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="w-full max-w-2xl mt-10">
          <h3 className="text-2xl font-bold text-amber-800 mb-4 font-mono">Reviews</h3>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((review) => (
                <li key={review.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <p className="text-amber-900 font-semibold">Rating: {review.rating} / 5</p>
                  <p className="text-gray-700 mt-1">{review.comment}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {auth_token && (
          <form
            onSubmit={handleReviewSubmit}
            className="bg-white mt-10 p-6 rounded-2xl shadow-md w-full max-w-2xl space-y-4"
          >
            <h3 className="text-xl font-bold text-amber-800 font-mono">Leave a Review</h3>

            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>

            <textarea
              placeholder="Your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
              rows="4"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-amber-800 text-white py-3 rounded-lg font-semibold hover:bg-amber-900 transition"
            >
              Submit Review
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF4EF] p-8">
      <h1 className="text-3xl font-bold text-amber-900 mb-8 font-mono text-center">
        Explore Our Restaurants
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border border-amber-100"
          >
            <Link to={`/restaurants/${restaurant.id}`}>
              <h2 className="text-xl font-semibold text-amber-800 mb-2">{restaurant.name}</h2>
              <p className="text-gray-700 text-sm">{restaurant.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
