import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

export const Transaction = sequelize.define("Transaction", {
  type: {
    type: DataTypes.ENUM("income", "expense"),
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
