const { Card } = require('../models');

const createCard = async (req, res) => {
  try {
    const { name, board_id, column_id, order_no } = req.body || {};

    const card = await Card.create({ board_id, title: name, column_id, order_no });

    return res.status(201).json({ status: 200, success: true, data: card });
  } catch (error) {
    console.error('Error creating columns:', error);
    return res.status(500).json({ status: 500, success: false, message: 'Failed to create column' });
  }
};

module.exports = { createCard };
