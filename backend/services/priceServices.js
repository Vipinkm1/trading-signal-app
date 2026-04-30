const axios = require("axios");

exports.getLivePrice = async (symbol) => {
  try {
    const res = await axios.get(
      `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
    );

    return parseFloat(res.data.price);
  } catch (error) {
    throw new Error("Failed to fetch price");
  }
};