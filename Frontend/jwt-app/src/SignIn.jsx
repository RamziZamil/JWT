import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/signin",
        { username, password },
        { withCredentials: true }
      );
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign In
        </h2>
        <form className="mt-4" onSubmit={handleSignin}>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300 mb-3"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300 mb-3"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Sign In
          </button>
        </form>
        <p className="mt-3 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
