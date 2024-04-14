import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

export const Budget = sequelize.define("Budget", {
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  limit: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
