import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

export const MonthlyExpenseGoal = sequelize.define("MonthlyExpenseGoal", {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  month: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
