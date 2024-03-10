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

const serializeBoardData = retroBoards => {
  const allBoards = retroBoards?.map(({ id, name, columns, cards }) => {
    return {
      id: id,
      name: name,
      columns: serializeColumnData(columns, cards)
    };
  });

  return allBoards;
};

const serializeColumnData = (columns, cards) => {
  const columnData = columns.map(({ id, title, tags }) => {
    const columnCards = cards.filter(card => card.column_id === id);
    return { id, name: title, tags, cards: serializeCardsData(columnCards) };
  });

  return columnData;
};

const serializeCardsData = data => {
  const cardsData = data.map(({ id, title, tags }) => {
    return { id, name: title, tags };
  });

  return cardsData;
};

module.exports = { serializeSpecificBoardData, serializeBoardBasicData, serializeBoardData, serializeColumnData, serializeCardsData };
