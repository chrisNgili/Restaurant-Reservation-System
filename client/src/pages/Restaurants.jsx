import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RestaurantDetail() {
  const { restaurantId } = useParams();
  const [menus, setMenus] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`/api/restaurants/${restaurantId}/menus`)
      .then(response => setMenus(response.data))
      .catch(error => console.error("Error fetching menus:", error));

    axios.get(`/api/restaurants/${restaurantId}/reviews`)
      .then(response => setReviews(response.data))
      .catch(error => console.error("Error fetching reviews:", error));
  }, [restaurantId]);

  return (
    <div>
      <h2>Menus</h2>
      <ul>
        {menus.map(menu => (
          <li key={menu.id}>{menu.item_name} - {menu.price}</li>
        ))}
      </ul>

      <h2>Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>{review.comment} - Rating: {review.rating}</li>
        ))}
      </ul>

      <ReservationForm restaurantId={restaurantId} />
    </div>
  );
}

function ReservationForm({ restaurantId }) {
  const [date, setDate] = useState('');
  const [partySize, setPartySize] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/reservations', { restaurant_id: restaurantId, date, party_size: partySize })
      .then(response => alert('Reservation successful!'))
      .catch(error => alert('Error making reservation.'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="number" value={partySize} onChange={(e) => setPartySize(e.target.value)} min="1" required />
      <button type="submit">Make Reservation</button>
    </form>
  );
}

export default RestaurantDetail;
