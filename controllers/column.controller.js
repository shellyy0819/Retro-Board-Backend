const { Column, BoardColumn } = require('../models');

const createColumn = async (req, res) => {
  try {
    const { name, board_id } = req.body || {};

    const column = await Column.create({ title: name, board_id });
    await BoardColumn.create({ board_id, column_id: column?.id });

    return res.status(201).json({ status: 200, success: true, data: column });
  } catch (error) {
    console.error('Error creating columns:', error);
    return res.status(500).json({ status: 500, success: false, message: 'Failed to create column' });
  }
};

module.exports = { createColumn };
