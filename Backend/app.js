const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const participantRoutes = require("./routes/participantRoutes");
const errorHandler = require("./utils/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo" });
});

app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/participants", participantRoutes);

app.use(errorHandler);

module.exports = app;
