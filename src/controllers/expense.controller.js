import { Expense } from "../models/expense.model.js";
import { Transaction } from "../models/transaction.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const addExpense = async (req, res) => {
  const { amount, tag, type, date, userId, description } = req.body;

  try {
    if (!amount || !tag || !date || !userId || !description || !type) {
      throw new ApiError(400, "Enter all details");
    }

    const user = await User.findByPk(userId);

    if (user) {
      const expense = await Expense.create({
        amount,
        tag,
        type,
        date,
        userId,
        description,
      });

      const transaction = await Transaction.create({
        userId,
        type,
        amount,
        date,
        description,
      });

      user.totalExpense = (user.totalExpense || 0) + amount;
      user.currentBalance = user.currentBalance - amount;

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Expense added successfully",
        expense,
        transaction,
      });
    } else {
      throw new ApiError(404, "User not defined");
    }
  } catch (error) {
    console.error("Error adding income:", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const deleteExpense = async (req, res) => {};
