import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const { user, logout_user } = useContext(UserContext);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between items-center p-4 space-y-2 md:space-y-0">
        <h1 className="text-2xl font-bold text-amber-800 font-mono">ChronoBites</h1>

        <nav className="hidden md:flex space-x-8">
          <a href="/" className="text-gray-700 hover:text-amber-800 font-medium">Home</a>
          {user && (
            <>
              <a href="/restaurants" className="text-gray-700 hover:text-amber-800 font-medium">Restaurants</a>
              <a href="/reservations" className="text-gray-700 hover:text-amber-800 font-medium">Reserve a Table</a>

              {user.is_admin && (
                <>
                  <a href="/admin" className="text-red-600 hover:text-red-800 font-medium">Admin Dashboard</a>
                  <a href="/admin/users" className="text-red-600 hover:text-red-800 font-medium">Manage Users</a>
                  <a href="/admin/create-restaurant" className="text-red-600 hover:text-red-800 font-medium">Create Restaurant</a>
                  <a href="/admin/reservations" className="text-red-600 hover:text-red-800 font-medium">Manage Reservations</a>
                  <a href="/admin/menus" className="text-red-600 hover:text-red-800 font-medium">Manage Menus</a>
                </>
              )}
            </>
          )}
        </nav>

        <div className="hidden md:block w-64">
          <input
            type="text"
            placeholder="Search restaurants..."
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
          />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <button
                className="text-amber-800 font-medium border border-amber-800 px-4 py-1 rounded hover:bg-amber-800 hover:text-white"
                onClick={() => window.location.href = '/login'}>
                Login
              </button>
              <button
                className="bg-amber-800 text-white font-medium px-4 py-1 rounded hover:bg-amber-900"
                onClick={() => window.location.href = '/signup'}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              <a href="/profile" className="text-amber-800 hover:text-amber-900">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M5.121 17.804A9.004 9.004 0 0112 15c2.003 0 3.847.659 5.121 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zM21 12A9 9 0 103 12a9 9 0 0018 0z" />
                </svg>
              </a>
              <button
                className="text-red-600 font-medium border border-red-500 px-4 py-1 rounded hover:bg-red-600 hover:text-white transition"
                onClick={logout_user}>
                Logout
              </button>
            </>
          )}
        </div>

        <button className="md:hidden text-amber-800 ml-auto">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
