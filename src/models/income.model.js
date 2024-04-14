import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

export const Income = sequelize.define("Income", {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("credit", "expense"),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
