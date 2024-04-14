import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

export const Expense = sequelize.define("Expense", {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  tag: {
    type: DataTypes.STRING,
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