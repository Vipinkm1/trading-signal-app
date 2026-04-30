// =========================
// STATUS LOGIC
// =========================
exports.calculateStatus = (signal, price) => {
  // ✅ 1. Final state immutable
  if (["TARGET_HIT", "STOPLOSS_HIT", "EXPIRED"].includes(signal.status)) {
    return signal.status;
  }

  const now = new Date();

  // ✅ 2. Expiry check
  if (now > new Date(signal.expiry_time)) {
    return "EXPIRED";
  }

  // ✅ 3. BUY logic
  if (signal.direction === "BUY") {
    if (price >= signal.target_price) return "TARGET_HIT";
    if (price <= signal.stop_loss) return "STOPLOSS_HIT";
  }

  // ✅ 4. SELL logic
  if (signal.direction === "SELL") {
    if (price <= signal.target_price) return "TARGET_HIT";
    if (price >= signal.stop_loss) return "STOPLOSS_HIT";
  }

  // ✅ 5. Default
  return "OPEN";
};


// =========================
// ROI LOGIC (IMPROVED)
// =========================
exports.calculateROI = (signal, price) => {
  // 🔥 1. Safe check
  if (!signal.entry_price || signal.entry_price === 0) return 0;

  let basePrice = price;

  // 🔥 2. Use exit price if trade is closed
  if (signal.status === "TARGET_HIT") {
    basePrice = signal.target_price;
  }

  if (signal.status === "STOPLOSS_HIT") {
    basePrice = signal.stop_loss;
  }

  let roi = 0;

  // 🔥 3. BUY calculation
  if (signal.direction === "BUY") {
    roi = ((basePrice - signal.entry_price) / signal.entry_price) * 100;
  } 
  // 🔥 4. SELL calculation
  else {
    roi = ((signal.entry_price - basePrice) / signal.entry_price) * 100;
  }

  // 🔥 5. Cap unrealistic ROI
  if (roi > 1000) roi = 1000;
  if (roi < -100) roi = -100;

  return parseFloat(roi.toFixed(2));
};