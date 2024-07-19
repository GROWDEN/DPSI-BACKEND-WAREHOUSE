const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Barang = sequelize.define(
    "Barang",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hargaJual: {
        type: DataTypes.FLOAT, // or DataTypes.DECIMAL
        allowNull: false,
      },
      stok: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "Barang",
    }
  );

  Barang.associate = (models) => {
    Barang.hasMany(models.BarangKeluar, {
      foreignKey: "barangId",
      as: "barangKeluar",
    });
    Barang.hasMany(models.BarangMasuk, {
      foreignKey: "barangId",
      as: "barangMasuk",
    });
  };

  Barang.prototype.tambahBarang = async function (
    nama,
    brand,
    hargaJual,
    stok
  ) {
    try {
      const newBarang = await Barang.create({ nama, brand, hargaJual, stok });
      return newBarang;
    } catch (error) {
      throw new Error("Error adding new Barang: " + error.message);
    }
  };

  Barang.prototype.editBarang = async function (id, updateData) {
    try {
      const barang = await Barang.findByPk(id);
      if (!barang) throw new Error("Barang not found");

      Object.assign(barang, updateData);
      await barang.save();
      return barang;
    } catch (error) {
      throw new Error("Error updating Barang: " + error.message);
    }
  };

  Barang.prototype.cariBarang = async function (criteria) {
    try {
      const barangs = await Barang.findAll({ where: criteria });
      return barangs;
    } catch (error) {
      throw new Error("Error searching for Barang: " + error.message);
    }
  };

  return Barang;
};
