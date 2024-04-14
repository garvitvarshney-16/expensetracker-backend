import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    totalBudget: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    totalExpense: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    currentBalance: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    }
  },
  {
    // Other model options go here
    tableName: "users",
  }
);

