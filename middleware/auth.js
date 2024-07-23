// middleware/auth.js
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  // Ambil token dari header Authorization
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Jika tidak ada token, kembalikan status 401 Unauthorized
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  const token = authHeader.replace("Bearer ", "");
  try {
    // Verifikasi token
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = decoded; // Simpan informasi pengguna yang terdekode dalam req.user
    next(); // Lanjutkan ke middleware berikutnya atau handler rute
  } catch (err) {
    // Jika token tidak valid, kembalikan status 401 Unauthorized
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Ambil peran pengguna dari req.user
// Jika pengguna memiliki peran yang diizinkan, lanjutkan ke middleware berikutnya atau handler rute
// Jika pengguna tidak memiliki peran yang diizinkan, kembalikan status 403 Forbidden
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
