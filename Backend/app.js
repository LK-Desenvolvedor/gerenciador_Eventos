const app = require("./server");
const connectDB = require("./database");
require('dotenv').config();

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor está funcionando na porta ${PORT}`);
});

