var express = require("express");
var router = express.Router();

// Import routers
const barangRoutes = require("./barangRoutes");
const barangMasukRouter = require("./barangMasukRoutes");
const barangKeluarRouter = require("./barangKeluarRoutes");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Use the imported routers
router.use("/barang", barangRoutes);
router.use("/barang-masuk", barangMasukRouter);
router.use("/barang-keluar", barangKeluarRouter);

module.exports = router;
