const Cryptocurrency = require('../models/Cryptocurrency');
const { calculateStandardDeviation } = require('../utils/standardDeviation');

exports.getDeviation = async (req, res) => {
  try {
    const { coin } = req.query;
    if (!coin) {
      return res.status(400).json({ error: 'Coin parameter is required' });
    }

    const last100Records = await Cryptocurrency.find({ coin })
      .sort({ timestamp: -1 })
      .limit(100)
      .select('price');

    if (last100Records.length === 0) {
      return res.status(404).json({ error: 'No data found for the specified coin' });
    }

    const prices = last100Records.map((record) => record.price);
    const deviation = calculateStandardDeviation(prices);

    res.json({ deviation });
  } catch (error) {
    console.error('Error in getDeviation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};