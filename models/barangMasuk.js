const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const BarangMasuk = sequelize.define(
    "BarangMasuk",
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
      tanggalMasuk: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      namaBrand: {
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
      tableName: "BarangMasuk",
    }
  );

  BarangMasuk.prototype.tambahBarangMasuk = function () {
    // tambahBarangMasuk method implementation
  };

  return BarangMasuk;
};
