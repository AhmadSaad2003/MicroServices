// models/User.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db.js"); // Adjust the path according to your project structure

class User extends Model {
  static associate(models) {
    // Define association with Document
    User.hasMany(models.Document, {
      foreignKey: "userId", // Foreign key in Document table
      sourceKey: "id", // Source key in User table
    });
    User.hasMany(models.VersionControl, {
      foreignKey: "userId",
      sourceKey: "id",
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users", // This will create a users table
  }
);

module.exports = User;
