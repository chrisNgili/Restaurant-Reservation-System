import React, { useContext, useState } from "react";
import { RestaurantContext } from "../context/RestaurantContext";
import { UserContext } from "../context/UserContext";
import { api_url } from "../config.json";
import { toast } from "react-toastify";

export default function Reservations() {
  const { restaurants } = useContext(RestaurantContext);
  const { auth_token } = useContext(UserContext);

  const [restaurantId, setRestaurantId] = useState("");
  const [partySize, setPartySize] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!auth_token) {
      toast.error("Please log in to make a reservation.");
      return;
    }

    if (!restaurantId || !partySize || !date) {
      toast.error("All fields are required.");
      return;
    }

    fetch(`${api_url}/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`,
      },
      body: JSON.stringify({
        restaurant_id: restaurantId,
        party_size: partySize,
        date: date,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        toast.success("Reservation made successfully!");
        setRestaurantId("");
        setPartySize("");
        setDate("");
      })
      .catch((err) => {
        console.error("Reservation error:", err);
        toast.error("Failed to make reservation.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF4EF] p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-amber-800 text-center font-mono">
          Make a Reservation
        </h2>

        <select
          value={restaurantId}
          onChange={(e) => setRestaurantId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800 text-gray-700"
        >
          <option value="" disabled>
            Select Restaurant
          </option>
          {restaurants.map((restaurant) => (
            <option key={restaurant.id} value={restaurant.id}>
              {restaurant.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Party Size"
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
        />

        <button
          type="submit"
          className="w-full bg-amber-800 text-white py-3 rounded-lg font-semibold hover:bg-amber-900 transition"
        >
          Reserve
        </button>
      </form>
    </div>
  );
}
