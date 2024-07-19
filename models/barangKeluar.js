const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const BarangKeluar = sequelize.define(
    "BarangKeluar",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      barangId: {
        type: DataTypes.UUID,
        references: {
          model: "Barang", // Must match the name of the Barang table
          key: "id",
        },
      },
      tanggalKeluar: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      namaPembeli: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hargaSatuan: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      tableName: "BarangKeluar",
    }
  );

  BarangKeluar.prototype.tambahBarangKeluar = function () {
    // tambahBarangKeluar method implementation
  };

  return BarangKeluar;
};
