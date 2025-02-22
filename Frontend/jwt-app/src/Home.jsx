import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold text-gray-800">Home Page</h2>
      <div className="mt-4 space-y-3">
        <Link
          to="/signup"
          className="block p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Sign Up
        </Link>
        <Link
          to="/signin"
          className="block p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Sign In
        </Link>
        <Link
          to="/profile"
          className="block p-3 bg-purple-500 text-white rounded-md hover:bg-purple-600"
        >
          Profile
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
