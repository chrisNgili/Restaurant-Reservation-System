import React, { useState, useEffect, useContext } from "react";
import { api_url } from "../config.json";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export function AdminDashboard() {
  const dashboardItems = [
    { to: "/admin/create-restaurant", title: "Create Restaurant", description: "Add a new restaurant to ChronoBites." },
    { to: "/admin/users", title: "Manage Users", description: "View and manage all registered users." },
    { to: "/admin/reservations", title: "Reservations", description: "See all restaurant reservations." },
    { to: "/admin/menus", title: "Manage Menus", description: "Add/edit/delete restaurant menus." }
  ];

  return (
    <div className="min-h-screen bg-[#FAF4EF] p-8">
      <h1 className="text-3xl font-bold text-amber-900 font-mono mb-4">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome Admin! Choose a section to manage:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dashboardItems.map((item, index) => (
          <Link key={index} to={item.to} className="bg-white p-6 rounded-xl shadow border border-amber-100 hover:border-amber-300 transition">
            <h2 className="text-lg font-semibold text-amber-800">{item.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ManageUsers() {
  const { auth_token } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${api_url}/users`, { headers: { Authorization: `Bearer ${auth_token}` } })
      .then(res => res.json())
      .then(setUsers)
      .catch(() => toast.error("Failed to load users"));
  }, [auth_token]);

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
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth_token}` },
      body: JSON.stringify(formData),
    })
    .then(async res => {
      if (!res.ok) throw new Error((await res.json()).message || "Failed to create restaurant");
      toast.success("Restaurant created!");
      setFormData({ name: '', location: '', contacts: '', description: '' });
    })
    .catch(err => toast.error(err.message || "Creation failed"));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-amber-900">Create Restaurant</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        {['name', 'location', 'contacts', 'description'].map(field => (
          <input key={field} type="text" placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                 className="w-full p-3 border border-gray-300 rounded" value={formData[field]}
                 onChange={(e) => setFormData({ ...formData, [field]: e.target.value })} required />
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
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`${api_url}/restaurants`).then(res => res.json()),
      fetch(`${api_url}/users`, { headers: { Authorization: `Bearer ${auth_token}` } }).then(res => res.json())
    ]).then(([restaurantsData, usersData]) => {
      setRestaurants(restaurantsData);
      setUsers(usersData);
    }).catch(() => toast.error("Failed to load data"));
  }, [auth_token]);

  const fetchReservations = () => {
    if (!selectedId) return;
    fetch(`${api_url}/restaurants/${selectedId}/reservations`, { headers: { Authorization: `Bearer ${auth_token}` } })
      .then(res => res.json())
      .then(setReservations)
      .catch(() => toast.error("Failed to load reservations"));
  };

  const handleStatusChange = (reservationId, newStatus) => {
    fetch(`${api_url}/reservations/${reservationId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth_token}` },
      body: JSON.stringify({ status: newStatus }),
    }).then(res => {
      if (!res.ok) throw new Error();
      toast.success("Status updated");
      setReservations(prev => prev.map(r => r.id === reservationId ? { ...r, status: newStatus } : r));
    }).catch(() => toast.error("Failed to update status"));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-amber-900">Manage Reservations</h1>
      <div className="mt-4 flex gap-3 items-center">
        <select className="p-2 border border-gray-300 rounded" onChange={(e) => setSelectedId(e.target.value)} value={selectedId}>
          <option value="">Select Restaurant</option>
          {restaurants.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
        <button onClick={fetchReservations} className="px-4 py-2 bg-amber-800 text-white rounded">Load</button>
      </div>
      <ul className="mt-6 space-y-4">
        {reservations.map(res => (
          <li key={res.id} className="bg-white p-4 rounded shadow border border-gray-100">
            <p><strong>User:</strong> {users.find(u => u.id === res.user_id)?.name || `User ${res.user_id}`}</p>
            <p><strong>Party Size:</strong> {res.party_size}</p>
            <p><strong>Date:</strong> {res.date}</p>
            <div className="mt-2">
              <label className="text-sm text-gray-600 mr-2">Status:</label>
              <select value={res.status} onChange={(e) => handleStatusChange(res.id, e.target.value)} className="border border-gray-300 p-1 rounded">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
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
  const [newItem, setNewItem] = useState({ item_name: "", description: "", price: "" });
  const [editingItem, setEditingItem] = useState(null);

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

  const handleAddItem = () => {
    fetch(`${api_url}/restaurants/${selectedId}/menu`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth_token}` },
      body: JSON.stringify(newItem),
    }).then(() => {
      toast.success("Item added!");
      setNewItem({ item_name: "", description: "", price: "" });
      fetchMenu();
    }).catch(() => toast.error("Failed to add item"));
  };

  const handleUpdateItem = () => {
    fetch(`${api_url}/menu/${editingItem.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth_token}` },
      body: JSON.stringify(editingItem),
    }).then(() => {
      toast.success("Item updated!");
      setEditingItem(null);
      fetchMenu();
    }).catch(() => toast.error("Update failed"));
  };

  const handleDeleteItem = (id) => {
    fetch(`${api_url}/menu/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${auth_token}` },
    }).then(() => {
      toast.success("Item deleted!");
      fetchMenu();
    }).catch(() => toast.error("Delete failed"));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-amber-900">Manage Menus</h1>
      <div className="mt-4 flex gap-3 items-center">
        <select className="p-2 border border-gray-300 rounded" onChange={(e) => setSelectedId(e.target.value)} value={selectedId}>
          <option value="">Select Restaurant</option>
          {restaurants.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
        <button onClick={fetchMenu} className="px-4 py-2 bg-amber-800 text-white rounded">Load</button>
      </div>

      {selectedId && (
        <div className="mt-6 space-y-2">
          <h2 className="text-xl font-semibold text-amber-700">Add Menu Item</h2>
          <input type="text" placeholder="Item Name" className="w-full p-2 border rounded" value={newItem.item_name} onChange={(e) => setNewItem({ ...newItem, item_name: e.target.value })} />
          <input type="text" placeholder="Description" className="w-full p-2 border rounded" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} />
          <input type="number" placeholder="Price" className="w-full p-2 border rounded" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
          <button onClick={handleAddItem} className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
        </div>
      )}

      <ul className="mt-6 space-y-4">
        {menuItems.map(item => (
          <li key={item.id} className="bg-white p-4 rounded shadow border border-gray-100">
            {editingItem?.id === item.id ? (
              <>
                <input className="w-full border p-2 rounded mb-2" value={editingItem.item_name} onChange={e => setEditingItem({ ...editingItem, item_name: e.target.value })} />
                <input className="w-full border p-2 rounded mb-2" value={editingItem.description} onChange={e => setEditingItem({ ...editingItem, description: e.target.value })} />
                <input type="number" className="w-full border p-2 rounded mb-2" value={editingItem.price} onChange={e => setEditingItem({ ...editingItem, price: e.target.value })} />
                <div className="flex gap-2">
                  <button onClick={handleUpdateItem} className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
                  <button onClick={() => setEditingItem(null)} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p><strong>{item.item_name}</strong> - {item.description}</p>
                <p>KES {item.price}</p>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => setEditingItem(item)} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => handleDeleteItem(item.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
