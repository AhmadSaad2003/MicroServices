const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

class User extends Model {
  static associate(models) {
    User.hasMany(models.Document, {
      foreignKey: "userId",
      sourceKey: "id",
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
    tableName: "users",
  }
);

module.exports = User;
