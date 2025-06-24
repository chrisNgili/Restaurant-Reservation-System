import React, { useState, useEffect, useContext } from "react";
import { api_url } from "../config.json";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#FAF4EF] p-8">
      <h1 className="text-3xl font-bold text-amber-900 font-mono mb-4">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome Admin! Choose a section to manage:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Link to="/admin/create-restaurant" className="bg-white p-6 rounded-xl shadow border border-amber-100 hover:border-amber-300 transition">
          <h2 className="text-lg font-semibold text-amber-800">Create Restaurant</h2>
          <p className="text-sm text-gray-600 mt-1">Add a new restaurant to ChronoBites.</p>
        </Link>

        <Link to="/admin/users" className="bg-white p-6 rounded-xl shadow border border-amber-100 hover:border-amber-300 transition">
          <h2 className="text-lg font-semibold text-amber-800">Manage Users</h2>
          <p className="text-sm text-gray-600 mt-1">View and manage all registered users.</p>
        </Link>

        <Link to="/admin/reservations" className="bg-white p-6 rounded-xl shadow border border-amber-100 hover:border-amber-300 transition">
          <h2 className="text-lg font-semibold text-amber-800">Reservations</h2>
          <p className="text-sm text-gray-600 mt-1">See all restaurant reservations.</p>
        </Link>

        <Link to="/admin/menus" className="bg-white p-6 rounded-xl shadow border border-amber-100 hover:border-amber-300 transition">
          <h2 className="text-lg font-semibold text-amber-800">Manage Menus</h2>
          <p className="text-sm text-gray-600 mt-1">Add/edit/delete restaurant menus.</p>
        </Link>
      </div>
    </div>
  );
}

export function ManageUsers() {
  const { auth_token } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch(`${api_url}/users`, {
      headers: { Authorization: `Bearer ${auth_token}` },
    })
      .then(res => res.json())
      .then(setUsers)
      .catch(() => toast.error("Failed to load users"));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-amber-900">Manage Users</h1>
      <ul className="mt-4 space-y-2">
        {users.map(user => (
          <li key={user.id} className="bg-white p-4 rounded shadow">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Admin:</strong> {user.is_admin ? "Yes" : "No"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CreateRestaurant() {
  const { auth_token } = useContext(UserContext);
  const [formData, setFormData] = useState({ name: '', location: '', contacts: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${api_url}/restaurants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`,
      },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (res.ok) toast.success("Restaurant created!");
        else throw new Error();
      })
      .catch(() => toast.error("Creation failed"));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-amber-900">Create Restaurant</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        {['name', 'location', 'contacts', 'description'].map(field => (
          <input
            key={field}
            type="text"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full p-3 border border-gray-300 rounded"
            value={formData[field]}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            required
          />
        ))}
        <button type="submit" className="bg-amber-800 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
}

export function ManageReservations() {
  const { auth_token } = useContext(UserContext);
  const [reservations, setReservations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    fetch(`${api_url}/restaurants`)
      .then(res => res.json())
      .then(setRestaurants)
      .catch(() => toast.error("Failed to load restaurants"));
  }, []);

  const fetchReservations = () => {
    if (!selectedId) return;
    fetch(`${api_url}/restaurants/${selectedId}/reservations`, {
      headers: { Authorization: `Bearer ${auth_token}` },
    })
      .then(res => res.json())
      .then(setReservations)
      .catch(() => toast.error("Failed to load reservations"));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-amber-900">Manage Reservations</h1>
      <select
        className="p-2 border border-gray-300 rounded mt-4"
        onChange={(e) => setSelectedId(e.target.value)}
      >
        <option value="">Select Restaurant</option>
        {restaurants.map(r => (
          <option key={r.id} value={r.id}>{r.name}</option>
        ))}
      </select>
      <button onClick={fetchReservations} className="ml-2 px-4 py-2 bg-amber-800 text-white rounded">Load</button>

      <ul className="mt-4 space-y-2">
        {reservations.map(res => (
          <li key={res.id} className="bg-white p-4 rounded shadow">
            <p>User ID: {res.user_id}</p>
            <p>Party Size: {res.party_size}</p>
            <p>Status: {res.status}</p>
            <p>Date: {res.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ManageMenus() {
  const { auth_token } = useContext(UserContext);
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    fetch(`${api_url}/restaurants`)
      .then(res => res.json())
      .then(setRestaurants)
      .catch(() => toast.error("Failed to load restaurants"));
  }, []);

  const fetchMenu = () => {
    if (!selectedId) return;
    fetch(`${api_url}/restaurants/${selectedId}/menu`)
      .then(res => res.json())
      .then(setMenuItems)
      .catch(() => toast.error("Failed to load menu"));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-amber-900">Manage Menus</h1>
      <select
        className="p-2 border border-gray-300 rounded mt-4"
        onChange={(e) => setSelectedId(e.target.value)}
      >
        <option value="">Select Restaurant</option>
        {restaurants.map(r => (
          <option key={r.id} value={r.id}>{r.name}</option>
        ))}
      </select>
      <button onClick={fetchMenu} className="ml-2 px-4 py-2 bg-amber-800 text-white rounded">Load</button>

      <ul className="mt-4 space-y-2">
        {menuItems.map(item => (
          <li key={item.id} className="bg-white p-4 rounded shadow">
            <p><strong>{item.item_name}</strong> - {item.description}</p>
            <p>KES {item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
