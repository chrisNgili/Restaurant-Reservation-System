import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const { register_user } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      return alert("Passwords do not match");
    } else if (password.length < 8) {
      return alert("Password must be at least 8 characters");
    } else {
      register_user(name, email, number, password);
      setName('');setEmail('');setNumber('');setPassword('');setRepeatPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff3ea] py-10 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-[#f15a29] text-center font-mono">Create Your Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f15a29]"
          />
          <input
            required
            type="number"
            placeholder="Phone Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f15a29]"
          />
          <input
            required
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f15a29]"
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f15a29]"
          />
          <input
            required
            type="password"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f15a29]"
          />
          <button
            type="submit"
            className="w-full bg-[#f15a29] text-white font-semibold py-3 rounded-lg hover:bg-[#e15020] transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-[#f15a29] hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
}
