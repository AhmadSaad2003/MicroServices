// models/Document.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db.js"); // Adjust the path according to your project structure

class Document extends Model {
  static associate(models) {
    // Define association with User
    Document.belongsTo(models.User, {
      foreignKey: "userId", // Foreign key in Document table
      targetKey: "id", // Target key in User table
    });
    Document.hasMany(models.VersionControl, {
      foreignKey: "documentId",
      sourceKey: "id",
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
    },
    createdBy: {
      type: DataTypes.STRING,
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
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Default to the current date and time
    },
  },
  {
    sequelize,
    modelName: "Document",
    tableName: "documents", // This will create a documents table
  }
);

module.exports = Document;
