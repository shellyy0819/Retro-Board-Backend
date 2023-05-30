const path = require('path');
const fs = require('fs');

// Register's all routes and models
const registerModels = async () => {
  const modelsFolder = path.resolve('./models');
  const models = fs.readdirSync(modelsFolder);
  models.map(nestedModel => {
    nestedModel = nestedModel.replace('.js', '');
    return require(path.resolve(`${modelsFolder}/${nestedModel}`));
  });
};

module.exports = {
  registerModels
};
