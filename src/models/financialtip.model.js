import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

export const FinancialTip = sequelize.define("FinancialTip", {
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
