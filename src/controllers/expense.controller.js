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

export const getExpense = async (req, res) => {
  const { userId } = req.params; // Assuming userId is passed in the URL parameters

  try {
    // Find expenses for the user
    const userExpenses = await Expense.findAll({
      where: {
        userId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Expense details retrieved successfully",
      expenses: userExpenses,
    });
  } catch (error) {
    console.error("Error fetching expense details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateExpense = async (req, res) => {
  const { id } = req.params; // Assuming expenseId is passed in the URL parameters
  const { amount, tag, type, date, userId, description } = req.body;

  try {
    // Check if the expense exists
    const existingExpense = await Expense.findByPk(id);
    if (!existingExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    // Update expense details
    existingExpense.amount = amount ?? existingExpense.amount;
    existingExpense.tag = tag ?? existingExpense.tag;
    existingExpense.type = type ?? existingExpense.type;
    existingExpense.date = date ?? existingExpense.date;
    existingExpense.userId = userId ?? existingExpense.userId;
    existingExpense.description = description ?? existingExpense.description;

    // Save the updated expense details
    await existingExpense.save();

    return res.status(200).json({
      success: true,
      message: "Expense details updated successfully",
      expense: existingExpense,
    });
  } catch (error) {
    console.error("Error updating expense details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params; // Assuming expenseId is passed in the URL parameters

  try {
    // Find the expense record by ID
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    // Delete the expense record
    await expense.destroy();

    return res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting expense:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
