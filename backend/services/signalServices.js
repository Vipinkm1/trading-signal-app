const { createSignalModel } = require("../models/signalModel");

const { getAllSignals } = require("../models/signalModel");
const { getLivePrice } = require("./priceServices");
const { calculateStatus, calculateROI } = require("../utils/signalLogic");
const { updateSignalStatus } = require("../models/signalModel");
const { getSignalByIdModel } = require("../models/signalModel");
const { deleteSignalModel } = require("../models/signalModel");

exports.createSignalService = (data, callback) => {
    if (!data || typeof data !== "object") {
        return callback("Request body is required and must be JSON");
    }

    const {
        symbol,
        direction,
        entry_price,
        stop_loss,
        target_price,
        entry_time,
        expiry_time
    } = data;

   
    if (!symbol || !direction || !entry_price || !stop_loss || !target_price || !entry_time || !expiry_time) {
        return callback("All fields are required");
    }

    if (!["BUY", "SELL"].includes(direction)) {
        return callback("Invalid direction");
    }

    if (direction === "BUY") {
        if (!(stop_loss < entry_price)) return callback("BUY: SL < Entry");
        if (!(target_price > entry_price)) return callback("BUY: Target > Entry");
    }

    if (direction === "SELL") {
        if (!(stop_loss > entry_price)) return callback("SELL: SL > Entry");
        if (!(target_price < entry_price)) return callback("SELL: Target < Entry");
    }

    if (new Date(expiry_time) <= new Date(entry_time)) {
        return callback("Invalid time");
    }

   
    createSignalModel(data, (err, result) => {
        if (err) return callback("Database error");

        callback(null, {
            id: result.insertId,
            ...data,
            status: "OPEN"
        });
    });
};

exports.getSignalsService = async (callback) => {
    getAllSignals(async (err, signals) => {
        if (err) return callback("DB error");

        try {
            const updated = await Promise.all(
                signals.map(async (signal) => {
                    const price = await getLivePrice(signal.symbol);

                    const status = calculateStatus(signal, price);
                    const roi = calculateROI(signal, price);
                    
                    if (status !== signal.status) {
                        updateSignalStatus(signal.id, status, roi, () => { });
                    }

                    return {
                        ...signal,
                        current_price: price,
                        status,
                        roi
                    };
                })
            );

            callback(null, updated);
        } catch (error) {
            callback("Error processing signals");
        }
    });
};

exports.getSignalByIdService = (id, callback) => {
  getSignalByIdModel(id, (err, result) => {
    if (err || result.length === 0) {
      return callback("Signal not found");
    }
    callback(null, result[0]);
  });
};

exports.deleteSignalService = (id, callback) => {
  deleteSignalModel(id, (err, result) => {
    if (err || result.affectedRows === 0) {
      return callback("Signal not found");
    }
    callback(null);
  });
};
