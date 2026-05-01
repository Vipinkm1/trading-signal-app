const { createSignalService } = require("../services/signalServices");
const { getSignalsService } = require("../services/signalServices");
const { getSignalByIdService } = require("../services/signalServices");
const { deleteSignalService } = require("../services/signalServices");

exports.createSignal = (req, res) => {
  createSignalService(req.body, (err, result) => {
    if (err) {
      return res.status(400).json({ message: err.message || err });
    }

    return res.status(201).json({
      message: "Signal created successfully",
      data: result
    });
  });
};



exports.getSignals = (req, res) => {
  getSignalsService((err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message || err });
    }

    res.json(result);
  });
};

exports.getSignalById = (req, res) => {
  getSignalByIdService(req.params.id, (err, result) => {
    if (err) return res.status(404).json({ message: err });
    res.json(result);
  });
};

exports.deleteSignal = (req, res) => {
  deleteSignalService(req.params.id, (err) => {
    if (err) return res.status(404).json({ message: err });

    res.json({ message: "Signal deleted successfully" });
  });
};