const express = require("express");
const router = express.Router();
const { createSignal } = require("../controller/signalController");
const { getSignals } = require("../controller/signalController");
const { getSignalById } = require("../controller/signalController");
const { deleteSignal } = require("../controller/signalController");

router.post("/", createSignal);
router.get("/", getSignals);
router.get("/:id", getSignalById);
router.delete("/:id", deleteSignal);
module.exports = router;
