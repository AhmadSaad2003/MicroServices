const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const User = require("./User");
const Document = require("./Document");
const VersionControl = require("./versionControl");

const models = { User, Document, VersionControl };

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = { ...models, sequelize };
