// models/VersionControl.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db.js"); // Adjust the path according to your project structure

class VersionControl extends Model {}

VersionControl.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    documentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "documents", // This should match the table name defined in the Document model
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // This should match the table name defined in the User model
        key: "id",
      },
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "VersionControl",
    tableName: "version_controls", // This will create a version_controls table
  }
);

module.exports = VersionControl;
