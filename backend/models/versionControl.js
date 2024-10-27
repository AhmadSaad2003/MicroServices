// models/VersionControl.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

class VersionControl extends Model {
  static associate(models) {
    VersionControl.belongsTo(models.Document, {
      foreignKey: "documentId",
      targetKey: "id",
      onDelete: "CASCADE", // Ensure VersionControl records are deleted when Document is deleted
      onUpdate: "CASCADE",
    });
    VersionControl.belongsTo(models.User, {
      foreignKey: "userId",
      targetKey: "id",
      onDelete: "CASCADE", // Ensure VersionControl records are deleted when User is deleted
      onUpdate: "CASCADE",
    });
  }
}

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
        model: "documents",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
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
    tableName: "version_controls",
  }
);

module.exports = VersionControl;
