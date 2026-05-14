
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
const stockRoutes = require("./routes/stockRoutes");
require("./workers/stockWorker");
require("./cron/stockCron");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Stock Market Data Pipeline API Running");
});

app.use("/stocks", stockRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});