const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const users = []; // Temporary in-memory storage

const SECRET_KEY = "Zamil12!"; // Store in .env in production

// Middleware to check JWT token
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  jwt.verify(token, SECRET_KEY, (err, data) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.user = data;
    next();
  });
};

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user object
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
  };
  users.push(newUser);

  // Generate JWT token
  const token = jwt.sign(
    {
      id: newUser.id,
      username: newUser.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  // Send token in an HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // Change to true in production
    sameSite: "strict",
  });

  res.status(201).json({ message: "User registered successfully", token });
});

// Signin Route
app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // Set to true in production
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
