import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/profile", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => navigate("/signin"));
  }, [navigate]);

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:5000/logout",
      {},
      { withCredentials: true }
    );
    alert("Logged out!");
    navigate("/signin");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
        {user ? (
          <p className="mt-3 text-gray-600">
            Welcome, <span className="font-bold">{user.username}</span>!
          </p>
        ) : (
          <p className="mt-3 text-gray-600">Loading...</p>
        )}
        <button
          onClick={handleLogout}
          className="mt-4 w-full p-3 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
