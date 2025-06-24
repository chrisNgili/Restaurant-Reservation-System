import React, { useState, useContext } from "react";
import { api_url } from "../config.json";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

export default function ReviewForm({ restaurantId, onReviewSubmitted }) {
  const { auth_token } = useContext(UserContext);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [dateOfVisit, setDateOfVisit] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!auth_token) {
      toast.error("Please sign in to leave a review");
      return;
    }

    fetch(`${api_url}/restaurants/${restaurantId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`,
      },
      body: JSON.stringify({ rating, comment, date: dateOfVisit }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Review submitted successfully!");
        setRating(1);
        setComment("");
        setDateOfVisit("");
        onReviewSubmitted();
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
        toast.error("Failed to submit review");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4 border border-amber-100 mt-6"
    >
      <h3 className="text-xl font-semibold text-amber-800 font-mono">Leave a Review</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
        >
          {[1, 2, 3, 4, 5].map((val) => (
            <option key={val} value={val}>{val}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
          rows="3"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date of Visit</label>
        <input
          type="date"
          value={dateOfVisit}
          onChange={(e) => setDateOfVisit(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-amber-800 text-white py-2 rounded-lg font-medium hover:bg-amber-900 transition"
      >
        Submit Review
      </button>
    </form>
  );
}
