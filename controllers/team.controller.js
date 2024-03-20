const { verifyToken } = require('../helpers/auth.helper');
const { Team, Board, TeamUser, Column, Card } = require('../models');
const { serializeBoardData } = require('../serializers/board.serializer');

const teamCreation = async (req, res) => {
  const { name } = req?.body || {};
  const { user } = await verifyToken(req, res);

  try {
    const newTeam = await Team.findOne({ where: { name } });
    if (newTeam) {
      return res.status(400).json({ status: 400, success: false, message: 'Team name already present' });
    }

    const team = await Team.create({ name });
    await TeamUser.create({ team_id: team.team_id, user_id: user?.id });

    return res.status(201).json({ status: 200, success: true, data: team });
  } catch (error) {
    console.error('Error creating team:', error);
    return res.status(500).json({ status: 500, success: false, message: 'Failed to create team' });
  }
};

const getAllBoardsData = async (req, res) => {
  const { id } = req.params || {};
  const token = await verifyToken(req, res);
  const { user } = token || {};

  if (!token) {
    return res.status(401).json({ status: 400, success: false, message: 'You are not authenticated!' });
  }

  try {
    const retroBoards = await Board.findAll({
      where: { team_id: id },
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

    const boardData = await serializeBoardData(retroBoards, user);

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

const getSpecificBoardData = async (req, res) => {
  const { team_id, board_id } = req.params || {};

  const token = await verifyToken(req, res);
  const { user } = token || {};

  if (!token) {
    return res.status(401).json({ status: 400, success: false, message: 'You are not authenticated!' });
  }

  try {
    const retroBoards = await Board.findAll({
      where: { team_id, id: board_id },
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

    const boardData = await serializeBoardData(retroBoards, user);

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

const updateTeamName = async (req, res) => {
  try {
    const { id } = req.params || {};
    const { name } = req.body || {};
    const team = await Team.findOne({ where: { id } });
    if (!team) {
      return res.status(404).json({ message: 'Team not found', success: false });
    }
    if (team?.name?.toLowerCase() === name?.toLowerCase()) {
      // no changes required
      return res.status(409).json({ status: 409, message: `${name} is already present`, success: false });
    }
    team.name = name;
    await team.save();
    return res.status(200).json({ status: 200, data: team, message: 'Team name updated successfully', success: true });
  } catch (error) {
    // Handle errors
    console.error('Error updating team name:', error);
    return res.status(500).json({ status: 500, message: 'Internal server error', success: false });
  }
};

module.exports = { teamCreation, getSpecificBoardData, updateTeamName, getAllBoardsData };
