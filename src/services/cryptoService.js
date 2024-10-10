const axios = require('axios');
const Cryptocurrency = require('../models/Cryptocurrency');

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

const fetchCryptoData = async (coinId) => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/coins/${coinId}`);
    const { market_data } = response.data;

    return {
      coin: coinId,
      price: market_data.current_price.usd,
      marketCap: market_data.market_cap.usd,
      change24h: market_data.price_change_percentage_24h,
    };
  } catch (error) {
    console.error(`Error fetching data for ${coinId}:`, error);
    return null;
  }
};

exports.fetchAndStoreCryptoData = async () => {
  const coins = ['bitcoin', 'matic-network', 'ethereum'];

  for (const coin of coins) {
    const data = await fetchCryptoData(coin);
    if (data) {
      await Cryptocurrency.create(data);
      console.log(`Data stored for ${coin}`);
    }
  }
};