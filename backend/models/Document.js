const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

class Document extends Model {
  static associate(models) {
    Document.belongsTo(models.User, {
      foreignKey: "userId",
      targetKey: "id",
      onDelete: "CASCADE",
    });
    Document.hasMany(models.VersionControl, {
      foreignKey: "documentId",
      sourceKey: "id",
      onDelete: "CASCADE",
    });
  }
}

Document.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Document",
    tableName: "documents",
  }
);

module.exports = Document;
