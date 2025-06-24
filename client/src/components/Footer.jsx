import React from "react";

function Footer() {
  return (
    <footer className="bg-amber-900 text-white py-2">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <div>
          <h2 className="text-xl font-bold mb-2">ChronoBites</h2>
          <p className="text-sm text-gray-300">Making restaurant reservations seamless and delightful. Join us today.</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-300">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/reservations" className="hover:underline">Reserve</a></li>
            <li><a href="#" className="hover:underline">Menus</a></li>
            <li><a href="/login" className="hover:underline">Login</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-sm text-gray-300">Nairobi, Kenya</p>
          <p className="text-sm text-gray-300">+254 700 000 000</p>
          <p className="text-sm text-gray-300">support@chronobites.com</p>
        </div>
      </div>
      <div className="text-center mt-6 text-sm text-gray-400 border-t border-amber-800 pt-4">
        &copy; 2025 ChronoBites. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
