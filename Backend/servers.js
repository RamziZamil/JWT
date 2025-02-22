const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const users = []; // In-memory user storage

const SECRET_KEY = "your_secret_key"; // Use dotenv in production

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(403).json({ message: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};

// Signup Route
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });
  res.json({ message: "User registered successfully" });
});

// Signin Route
app.post("/signin", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    sameSite: "strict",
  });

  res.json({ message: "Login successful" });
});

// Profile Route (Protected)
app.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Welcome to the profile page", user: req.user });
});

// Logout Route
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

// Start Server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
