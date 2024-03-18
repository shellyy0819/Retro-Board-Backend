const { verifyToken } = require('../helpers/auth.helper');
const { Board, Column, Card, BoardColumn } = require('../models');
const { serializeBoardData, serializeBoardBasicData } = require('../serializers/board.serializer');

// Not needed
const getBoardBasicData = async (req, res) => {
  try {
    const retroBoards = await Board.findAll();
    const boardData = serializeBoardBasicData(retroBoards);
    if (retroBoards?.length) {
      res.status(200).json({ data: boardData, message: 'Boards fetched successfully', success: true });
    } else {
      res.status(404).json({ message: 'No retro boards found', success: false });
    }
  } catch (error) {
    console.error('Error fetching retro boards', error);
    res.status(500).json({ message: error, success: false });
  }
};

// Not needed
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
    const boardData = await serializeBoardData(retroBoards);
    if (retroBoards?.length) {
      res.status(200).json({ data: boardData, message: 'Boards fetched successfully', success: true });
    } else {
      res.status(404).json({ message: 'No retro boards found', success: false });
    }
  } catch (error) {
    console.error('Error fetching retro boards', error);
    res.status(500).json({ message: error, success: false });
  }
};

const createBoard = async (req, res) => {
  const { board_name, meeting_date, team_id, template } = req.body || {};

  const { user } = await verifyToken(req, res);

  try {
    const board = await Board.create({
      name: board_name,
      created_by: user?.email_id,
      meeting_date,
      team_id
    });

    if (template === 'GOOD_BAD_BETTER' || !template) {
      // Create column data
      const columnData = [{ title: 'Good' }, { title: 'Bad' }, { title: 'Improve' }, { title: 'Kudos' }];

      // Create columns concurrently
      const columns = await Promise.all(
        columnData.map(async columnInfo => {
          const column = await Column.create({ ...columnInfo, board_id: board?.id });
          return column;
        })
      );

      // Create board columns concurrently
      await Promise.all(
        columns.map(async column => {
          const boardColumn = await BoardColumn.create({ board_id: board?.id, column_id: column?.id });
          return boardColumn;
        })
      );
    }

    res.status(200).json({ message: 'Board created successfully', success: true });
  } catch (error) {
    console.error('Error fetching retro boards', error);
    res.status(500).json({ message: error, success: false });
  }
};

module.exports = { getAllRetroBoards, createBoard, getBoardBasicData };
