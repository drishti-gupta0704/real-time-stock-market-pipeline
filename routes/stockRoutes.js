
const express = require("express");

const router = express.Router();

const { getStockData } = require("../controllers/stockController");

router.get("/:symbol", getStockData);

module.exports = router;