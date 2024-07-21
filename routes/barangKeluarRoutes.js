const express = require("express");
const { BarangKeluar, Barang } = require("../models"); // Sesuaikan dengan path model BarangKeluar dan Barang

const router = express.Router();

// GET all barang keluar
router.get("/barang-keluar", async (req, res) => {
  try {
    const barangKeluars = await BarangKeluar.findAll({
      include: [{ model: Barang, as: "Barang" }],
    });
    res.json(barangKeluars);
  } catch (error) {
    console.error("Error fetching barang keluars:", error);
    res.status(500).json({ error: "Failed to fetch barang keluars" });
  }
});

// GET one barang keluar by ID
router.get("/barang-keluar/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const barangKeluar = await BarangKeluar.findByPk(id, {
      include: [{ model: Barang, as: "Barang" }],
    });
    if (!barangKeluar) {
      res.status(404).json({ error: "Barang keluar not found" });
    } else {
      res.json(barangKeluar);
    }
  } catch (error) {
    console.error("Error fetching barang keluar:", error);
    res.status(500).json({ error: "Failed to fetch barang keluar" });
  }
});

// POST create new barang keluar
router.post("/barang-keluar", async (req, res) => {
  const { barangId, tanggalKeluar, namaPembeli, jumlah, hargaSatuan } =
    req.body;
  try {
    const newBarangKeluar = await BarangKeluar.create({
      barangId,
      tanggalKeluar,
      namaPembeli,
      jumlah,
      hargaSatuan,
    });
    res.json(newBarangKeluar);
  } catch (error) {
    console.error("Error creating barang keluar:", error);
    res.status(500).json({ error: "Failed to create barang keluar" });
  }
});

// PUT update barang keluar by ID
router.put("/barang-keluar/:id", async (req, res) => {
  const { id } = req.params;
  const { barangId, tanggalKeluar, namaPembeli, jumlah, hargaSatuan } =
    req.body;
  try {
    const barangKeluar = await BarangKeluar.findByPk(id);
    if (!barangKeluar) {
      res.status(404).json({ error: "Barang keluar not found" });
    } else {
      barangKeluar.barangId = barangId;
      barangKeluar.tanggalKeluar = tanggalKeluar;
      barangKeluar.namaPembeli = namaPembeli;
      barangKeluar.jumlah = jumlah;
      barangKeluar.hargaSatuan = hargaSatuan;
      await barangKeluar.save();
      res.json(barangKeluar);
    }
  } catch (error) {
    console.error("Error updating barang keluar:", error);
    res.status(500).json({ error: "Failed to update barang keluar" });
  }
});

// DELETE barang keluar by ID
router.delete("/barang-keluar/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const barangKeluar = await BarangKeluar.findByPk(id);
    if (!barangKeluar) {
      res.status(404).json({ error: "Barang keluar not found" });
    } else {
      await barangKeluar.destroy();
      res.json({ message: "Barang keluar deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting barang keluar:", error);
    res.status(500).json({ error: "Failed to delete barang keluar" });
  }
});

module.exports = router;
