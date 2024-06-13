const app = require("./app");
const connectDB = require("./database");
require('dotenv').config();

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor está funcionando na porta ${PORT}`);
});
