const Cryptocurrency = require('../models/Cryptocurrency');

exports.getStats = async (req, res) => {
  try {
    const { coin } = req.query;
    if (!coin) {
      return res.status(400).json({ error: 'Coin parameter is required' });
    }

    const latestData = await Cryptocurrency.findOne({ coin }).sort({ timestamp: -1 });

    if (!latestData) {
      return res.status(404).json({ error: 'No data found for the specified coin' });
    }

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h
    });
  } catch (error) {
    console.error('Error in getStats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};