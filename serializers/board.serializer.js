const { verifyToken } = require('../helpers/auth.helper');

const serializeSpecificBoardData = retroBoards => {
  const allBoards = retroBoards?.map(({ id, name }) => {
    return {
      id,
      name
    };
  });
  return allBoards;
};

const serializeBoardBasicData = retroBoards => {
  const allBoards = retroBoards?.map(({ dataValues }) => {
    return {
      id: dataValues.id,
      name: dataValues.name
    };
  });

  return allBoards;
};

const serializeCardsData = data => {
  const cardsData = data.map(({ id, title, tags }) => {
    return { id, name: title, tags };
  });

  return cardsData;
};

const serializeColumnData = (columns, cards) => {
  const columnData = columns.map(({ id, title, tags }) => {
    const columnCards = cards.filter(card => card.column_id === id);
    return { id, name: title, tags, cards: serializeCardsData(columnCards) };
  });

  return columnData;
};

const serializeBoardData = async (retroBoards, req, res) => {
  const { user } = await verifyToken(req, res);

  const allBoards = await retroBoards?.map(({ id, name, team_id, columns, cards, created_by }) => {
    return {
      id,
      name,
      team_id,
      is_owner: created_by === user?.email_id,
      columns: serializeColumnData(columns, cards)
    };
  });

  return allBoards;
};

module.exports = { serializeSpecificBoardData, serializeBoardBasicData, serializeBoardData, serializeColumnData, serializeCardsData };
