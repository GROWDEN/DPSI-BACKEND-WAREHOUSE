const express = require("express");
const { BarangMasuk, Barang } = require("../models"); // Sesuaikan dengan path model BarangMasuk dan Barang

const router = express.Router();

// GET all barang masuk
router.get("/barang-masuk", async (req, res) => {
  try {
    const barangMasuks = await BarangMasuk.findAll({
      include: [{ model: Barang, as: "Barang" }],
    });
    res.json(barangMasuks);
  } catch (error) {
    console.error("Error fetching barang masuks:", error);
    res.status(500).json({ error: "Failed to fetch barang masuks" });
  }
});

// GET one barang masuk by ID
router.get("/barang-masuk/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const barangMasuk = await BarangMasuk.findByPk(id, {
      include: [{ model: Barang, as: "Barang" }],
    });
    if (!barangMasuk) {
      res.status(404).json({ error: "Barang masuk not found" });
    } else {
      res.json(barangMasuk);
    }
  } catch (error) {
    console.error("Error fetching barang masuk:", error);
    res.status(500).json({ error: "Failed to fetch barang masuk" });
  }
});

// POST create new barang masuk
router.post("/barang-masuk", async (req, res) => {
  const { barangId, tanggalMasuk, namaBrand, jumlah, hargaSatuan } =
    req.body;
  try {
    const newBarangMasuk = await BarangMasuk.create({
      barangId,
      tanggalMasuk,
      namaBrand,
      jumlah,
      hargaSatuan,
    });
    res.json(newBarangMasuk);
  } catch (error) {
    console.error("Error creating barang masuk:", error);
    res.status(500).json({ error: "Failed to create barang masuk" });
  }
});

// PUT update barang masuk by ID
router.put("/barang-masuk/:id", async (req, res) => {
  const { id } = req.params;
  const { barangId, tanggalMasuk, namaBrand, jumlah, hargaSatuan } =
    req.body;
  try {
    const barangMasuk = await BarangMasuk.findByPk(id);
    if (!barangMasuk) {
      res.status(404).json({ error: "Barang masuk not found" });
    } else {
      barangMasuk.barangId = barangId;
      barangMasuk.tanggalMasuk = tanggalMasuk;
      barangMasuk.namaBrand = namaBrand;
      barangMasuk.jumlah = jumlah;
      barangMasuk.hargaSatuan = hargaSatuan;
      await barangMasuk.save();
      res.json(barangMasuk);
    }
  } catch (error) {
    console.error("Error updating barang masuk:", error);
    res.status(500).json({ error: "Failed to update barang masuk" });
  }
});

// DELETE barang masuk by ID
router.delete("/barang-masuk/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const barangMasuk = await BarangMasuk.findByPk(id);
    if (!barangMasuk) {
      res.status(404).json({ error: "Barang masuk not found" });
    } else {
      await barangMasuk.destroy();
      res.json({ message: "Barang masuk deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting barang masuk:", error);
    res.status(500).json({ error: "Failed to delete barang masuk" });
  }
});

module.exports = router;
