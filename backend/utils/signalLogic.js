
exports.calculateStatus = (signal, price) => {

  if (["TARGET_HIT", "STOPLOSS_HIT", "EXPIRED"].includes(signal.status)) {
    return signal.status;
  }

  const now = new Date();

 
  if (now > new Date(signal.expiry_time)) {
    return "EXPIRED";
  }


  if (signal.direction === "BUY") {
    if (price >= signal.target_price) return "TARGET_HIT";
    if (price <= signal.stop_loss) return "STOPLOSS_HIT";
  }

  
  if (signal.direction === "SELL") {
    if (price <= signal.target_price) return "TARGET_HIT";
    if (price >= signal.stop_loss) return "STOPLOSS_HIT";
  }

  
  return "OPEN";
};



exports.calculateROI = (signal, price) => {
  
  if (!signal.entry_price || signal.entry_price === 0) return 0;

  let basePrice = price;


  if (signal.status === "TARGET_HIT") {
    basePrice = signal.target_price;
  }

  if (signal.status === "STOPLOSS_HIT") {
    basePrice = signal.stop_loss;
  }

  let roi = 0;


  if (signal.direction === "BUY") {
    roi = ((basePrice - signal.entry_price) / signal.entry_price) * 100;
  } 

  else {
    roi = ((signal.entry_price - basePrice) / signal.entry_price) * 100;
  }


  if (roi > 1000) roi = 1000;
  if (roi < -100) roi = -100;

  return parseFloat(roi.toFixed(2));
};