import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

export const Saving = sequelize.define("Saving", {
  savingAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  savingMonth: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  expenseInMonth: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  salaryMonth: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  savingYear: {
    type: DataTypes.FLOAT,
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
