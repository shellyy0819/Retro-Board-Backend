const { Team, Board } = require('../models');
const { serializeSpecificBoardData } = require('../serializers/board.serializer');

const teamCreation = async (req, res) => {
  const { name } = req?.body || {};

  try {
    const newTeam = await Team.findOne({ where: { name } });
    if (newTeam) {
      return res.status(400).json({ status: 400, success: false, message: 'Team name already present' });
    }

    const team = await Team.create({ name });

    return res.status(201).json({ status: 200, success: true, data: team });
  } catch (error) {
    console.error('Error creating team:', error);
    return res.status(500).json({ status: 500, success: false, message: 'Failed to create team' });
  }
};

const getSpecificBoardData = async (req, res) => {
  const { id } = req.params || {};
  const retroBoards = await Board.findAll({ where: { team_id: id } });
  const boardData = serializeSpecificBoardData(retroBoards);
  res.status(200).json({ data: boardData, message: 'Fetched successfully', success: true });
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
      return res.status(200).json({ status: 200, message: `${name} is already present`, success: false });
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

module.exports = { teamCreation, getSpecificBoardData, updateTeamName };
