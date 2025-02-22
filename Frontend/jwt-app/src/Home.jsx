import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div>
    <h2>Home Page</h2>
    <Link to="/signup">Sign Up</Link> | <Link to="/signin">Sign In</Link> |{" "}
    <Link to="/profile">Profile</Link>
  </div>
);

export default Home;
