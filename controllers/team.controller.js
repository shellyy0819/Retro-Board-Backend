const { Team } = require('../models');

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

module.exports = { teamCreation };
