const { createSignalService } = require("../services/signalServices");
const { getSignalsService } = require("../services/signalServices");

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
