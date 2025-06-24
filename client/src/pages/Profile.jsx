import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

export default function Profile() {
  const { user, update_user, delete_profile } = useContext(UserContext);
  console.log("Current user in Profile:", user);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setNumber(user.phone);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        You need to be logged in to view this page.
      </div>
    );
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    update_user(name, email, number, password, newPassword);
  };

  return (
    <div className="min-h-screen bg-[#fef7ec] flex justify-center items-center py-10 font-mono">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8 border border-amber-100">
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
            alt="Profile"
            className="rounded-full w-28 h-28 border-4 border-amber-800 shadow-md mb-3"
          />
          <h2 className="text-2xl font-bold text-amber-900">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        <div className="flex justify-center mb-6">
          {user.is_admin ? (
            <span className="bg-amber-700 text-white px-4 py-1 rounded-full text-sm">
              Admin
            </span>
          ) : (
            <span className="bg-amber-500 text-white px-4 py-1 rounded-full text-sm">
              User
            </span>
          )}
        </div>

        <form onSubmit={handleUpdate} className="space-y-5">
          {[
            { id: "name", label: "Name", value: name, setter: setName, type: "text" },
            { id: "email", label: "Email", value: email, setter: setEmail, type: "email" },
            { id: "number", label: "Phone Number", value: number, setter: setNumber, type: "text" },
            { id: "password", label: "Current Password", value: password, setter: setPassword, type: "password" },
            { id: "newPassword", label: "New Password", value: newPassword, setter: setNewPassword, type: "password" },
            { id: "confirmPassword", label: "Confirm New Password", value: confirmPassword, setter: setConfirmPassword, type: "password" }
          ].map(({ id, label, value, setter, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-semibold text-amber-900 mb-1">
                {label}
              </label>
              <input
                id={id}
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="w-full px-4 py-2 border border-amber-200 rounded-md focus:ring-2 focus:ring-amber-800 focus:outline-none bg-white shadow-sm"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-amber-800 text-white py-2.5 rounded-lg hover:bg-amber-900 transition duration-200 font-semibold"
          >
            Update Profile
          </button>
        </form>

        <h3 className="text-lg font-bold text-amber-900 mt-10 mb-2">Danger Zone</h3>
        <button
          onClick={delete_profile}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
