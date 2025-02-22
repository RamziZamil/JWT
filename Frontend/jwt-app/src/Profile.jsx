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
    <div>
      <h2>Profile Page</h2>
      {user ? <p>Welcome, {user.username}!</p> : <p>Loading...</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
