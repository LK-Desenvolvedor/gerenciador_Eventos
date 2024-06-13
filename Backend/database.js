const mongoose = require("mongoose");
require('dotenv').config();

const dbURI = process.env.DB_URI;

if (!dbURI) {
  console.error("A variável de ambiente DB_URI não está definida no arquivo .env.");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Conectado ao banco de dados com sucesso!");
  } catch (err) {
    console.error("Conexão com o banco de dados falhou:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
