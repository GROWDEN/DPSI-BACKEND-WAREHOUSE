// routes/auth.js
const express = require("express");
const router = express.Router();
const { User } = require("../models/index"); // Import model User dari path yang sesuai
const bcrypt = require("bcryptjs"); // Import bcrypt untuk hashing password
const jwt = require("jsonwebtoken"); // Import jsonwebtoken untuk membuat token JWT

// Route registration
router.post("/register", async (req, res, next) => {
  try {
    // Ambil data dari body request
    const { username, password, role } = req.body;
    console.log("Creating user:", username, role);

    // Buat user baru di database
    const newUser = await User.create({ username, password, role });

    // Kirim respons sukses
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    // Tangani error, misalnya jika user sudah ada
    console.error("Error creating user:", err);
    res.status(500).json({ message: "User Already Exists" });
  }
});

// Route login
router.post("/login", async (req, res, next) => {
  try {
    // Ambil data dari body request
    const { username, password } = req.body;

    // Cari user di database berdasarkan username
    const user = await User.findOne({ where: { username } });
    // Jika user tidak ditemukan, kirim respons error
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Bandingkan password yang diberikan dengan password yang tersimpan di database
    const isMatch = await bcrypt.compare(password, user.password);
    // Jika password tidak cocok, kirim respons error
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Buat token JWT dengan payload id dan role user
    const token = jwt.sign(
      { id: user.id, role: user.role },
      "your_jwt_secret", // Gantilah dengan secret yang aman dan terkonfigurasi dengan baik
      { expiresIn: "1h" } // Token akan berakhir dalam 1 jam
    );

    // Kirim token JWT sebagai respons
    res.json({ token });
  } catch (err) {
    // Tangani error lainnya
    next(err);
  }
});

module.exports = router;
