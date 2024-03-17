const { where } = require('sequelize');
const { Board, Column, Card } = require('../models');
const { serializeBoardData, serializeBoardBasicData, serializeSpecificBoardData } = require('../serializers/board.serializer');

const getBoardBasicData = async (req, res) => {
  try {
    const retroBoards = await Board.findAll();
    const boardData = serializeBoardBasicData(retroBoards);
    if (retroBoards?.length) {
      res.status(200).json({ data: boardData, message: 'Fetched successfully', success: true });
    } else {
      res.status(404).json({ message: 'No retro boards found', success: false });
    }
  } catch (error) {
    console.error('Error fetching retro boards', error);
    res.status(500).json({ message: error, success: false });
  }
};

const getAllRetroBoards = async (req, res) => {
  try {
    const retroBoards = await Board.findAll({
      include: [
        {
          model: Column,
          as: 'columns'
        },
        {
          model: Card,
          as: 'cards' // Specify the alias for the association
        }
      ]
    });
    const boardData = serializeBoardData(retroBoards);
    if (retroBoards?.length) {
      res.status(200).json({ data: boardData, message: 'Fetched successfully', success: true });
    } else {
      res.status(404).json({ message: 'No retro boards found', success: false });
    }
  } catch (error) {
    console.error('Error fetching retro boards', error);
    res.status(500).json({ message: error, success: false });
  }
};

const createBoard = async (req, res) => {
  const { board_name, created_by, meeting_date, team_id } = req.body || {};
  try {
    const board = Board.build({
      name: board_name,
      created_by,
      meeting_date,
      team_id
    });
    await board.save();
    res.status(200).json({ message: 'Board created successfully', success: true });
  } catch (error) {
    console.error('Error fetching retro boards', error);
    res.status(500).json({ message: error, success: false });
  }
};

module.exports = { getAllRetroBoards, createBoard, getBoardBasicData };
