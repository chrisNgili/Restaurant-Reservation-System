import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login_user } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login_user(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff3ea] px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-[#f15a29] font-mono">Welcome Back</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f15a29]"
          />

          <div className="relative">
            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f15a29] pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-[#f15a29] font-medium focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#f15a29] text-white font-semibold py-3 rounded-lg hover:bg-[#e15020] transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#f15a29] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
