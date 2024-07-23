const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config(); // Load environment variables

const serviceUri = process.env.DATABASE_URL;

const sequelize = new Sequelize(serviceUri, {
  dialect: "mysql",
  dialectModule: require("mysql2"),
  logging: true,
});

// Import models
const User = require("./user")(sequelize, DataTypes);
const Barang = require("./barang")(sequelize, DataTypes);
const BarangMasuk = require("./barangMasuk")(sequelize, DataTypes);
const BarangKeluar = require("./barangKeluar")(sequelize, DataTypes);

// Define relationships
Barang.hasMany(BarangMasuk, { foreignKey: "barangId" });
BarangMasuk.belongsTo(Barang, { foreignKey: "barangId" });

Barang.hasMany(BarangKeluar, { foreignKey: "barangId" });
BarangKeluar.belongsTo(Barang, { foreignKey: "barangId" });

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection established successfully.");

    // Drop tables in a specific order
    await sequelize.queryInterface.dropTable("BarangKeluar", { force: true });
    await sequelize.queryInterface.dropTable("BarangMasuk", { force: true });
    await sequelize.queryInterface.dropTable("Barang", { force: true });

    // Then synchronize all models
    await sequelize.sync({ force: true });

    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
}

module.exports = {
  sequelize,
  User,
  Barang,
  BarangMasuk,
  BarangKeluar,
  syncDatabase,
};
