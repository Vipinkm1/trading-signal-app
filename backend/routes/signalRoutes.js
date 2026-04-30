const express = require("express");
const router = express.Router();
const { createSignal } = require("../controller/signalController");
const { getSignals } = require("../controller/signalController");

router.post("/", createSignal);
router.get("/", getSignals);
module.exports = router;
