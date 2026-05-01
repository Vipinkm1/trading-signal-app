const db = require("../config/db");

exports.createSignalModel = (data, callback) => {
  const query = `
    INSERT INTO signals 
    (symbol, direction, entry_price, stop_loss, target_price, entry_time, expiry_time, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      data.symbol,
      data.direction,
      data.entry_price,
      data.stop_loss,
      data.target_price,
      data.entry_time,
      data.expiry_time,
      "OPEN"
    ],
    callback
  );
};

exports.getAllSignals = (callback) => {
  db.query("SELECT * FROM signals", callback);
};

exports.updateSignalStatus = (id, status, roi, callback) => {
  const query = `
    UPDATE signals 
    SET status = ?, realized_roi = ?
    WHERE id = ?
  `;

  db.query(query, [status, roi, id], callback);
};

exports.getSignalByIdModel = (id, callback) => {
  const query = "SELECT * FROM signals WHERE id = ?";
  db.query(query, [id], callback);
};

exports.deleteSignalModel = (id, callback) => {
  const query = "DELETE FROM signals WHERE id = ?";
  db.query(query, [id], callback);
};