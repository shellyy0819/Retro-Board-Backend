const serializeSpecificBoardData = retroBoards => {
  const allBoards = retroBoards?.map(({ dataValues }) => {
    return {
      id: dataValues.id,
      name: dataValues.name
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

const serializeBoardData = retroBoards => {
  const allBoards = retroBoards?.map(({ id, name, team_id, columns, cards }) => {
    return {
      id,
      name,
      team_id,
      columns: serializeColumnData(columns, cards)
    };
  });

  return allBoards;
};

module.exports = { serializeSpecificBoardData, serializeBoardBasicData, serializeBoardData, serializeColumnData, serializeCardsData };
