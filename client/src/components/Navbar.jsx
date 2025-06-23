import React from "react";

function Navbar() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-amber-800">ChronoBites</h1>
        <nav className="hidden md:flex space-x-8">
          <a href="/" className="text-gray-700 hover:text-amber-800 font-medium">Home</a>
          <a href="#" className="text-gray-700 hover:text-amber-800 font-medium">Restaurants</a>
          <a href="#" className="text-gray-700 hover:text-amber-800 font-medium">Reservations</a>
          <a href="#" className="text-gray-700 hover:text-amber-800 font-medium">Contact</a>
        </nav>
        <div className="hidden md:flex space-x-4">
          <button className="text-amber-800 font-medium border border-amber-800 px-4 py-1 rounded hover:bg-amber-800 hover:text-white"
            onClick={() => window.location.href = '/login'}>
            Login
          </button>
          <button className="bg-amber-800 text-white font-medium px-4 py-1 rounded hover:bg-amber-900"
            onClick={() => window.location.href = '/signup'}>
            Sign Up
          </button>
        </div>
        <button className="md:hidden text-amber-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
