const express = require("express");
const { Barang } = require("../models");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

// GET all barang
router.get(
  "/allbarang",
  authenticate,
  authorize(["staff"]),
  async (req, res) => {
    try {
      const barangs = await Barang.findAll();
      res.json(barangs);
    } catch (error) {
      console.error("Error fetching barangs:", error);
      res.status(500).json({ error: "Failed to fetch barangs" });
    }
  }
);

// GET one barang by ID
router.get(
  "/barang/:id",
  authenticate,
  authorize(["staff"]),
  async (req, res) => {
    const { id } = req.params;
    try {
      const barang = await Barang.findByPk(id);
      if (!barang) {
        res.status(404).json({ error: "Barang not found" });
      } else {
        res.json(barang);
      }
    } catch (error) {
      console.error("Error fetching barang:", error);
      res.status(500).json({ error: "Failed to fetch barang" });
    }
  }
);

// POST create new barang
router.post(
  "/createbarang",
  authenticate,
  authorize(["staff"]),
  async (req, res) => {
    const { nama, brand, hargaJual, stok } = req.body; // Include all required fields
    try {
      const newBarang = await Barang.create({ nama, brand, hargaJual, stok });
      res.json(newBarang);
    } catch (error) {
      console.error("Error creating barang:", error);
      res.status(500).json({ error: "Failed to create barang" });
    }
  }
);

// PUT update barang by ID
router.put(
  "/barang/:id",
  authenticate,
  authorize(["staff"]),
  async (req, res) => {
    const { id } = req.params;
    const { nama, brand, hargaJual, stok } = req.body; // Include all required fields
    try {
      const barang = await Barang.findByPk(id);
      if (!barang) {
        res.status(404).json({ error: "Barang not found" });
      } else {
        barang.nama = nama;
        barang.brand = brand;
        barang.hargaJual = hargaJual;
        barang.stok = stok;
        await barang.save();
        res.json(barang);
      }
    } catch (error) {
      console.error("Error updating barang:", error);
      res.status(500).json({ error: "Failed to update barang" });
    }
  }
);

// DELETE barang by ID
router.delete(
  "/barang/:id",
  authenticate,
  authorize(["staff"]),
  async (req, res) => {
    const { id } = req.params;
    try {
      const barang = await Barang.findByPk(id);
      if (!barang) {
        res.status(404).json({ error: "Barang not found" });
      } else {
        await barang.destroy();
        res.json({ message: "Barang deleted successfully" });
      }
    } catch (error) {
      console.error("Error deleting barang:", error);
      res.status(500).json({ error: "Failed to delete barang" });
    }
  }
);

module.exports = router;
