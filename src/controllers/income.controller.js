import { Income } from "../models/income.model.js";
import { Transaction } from "../models/transaction.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const addIncome = async (req, res) => {
  const { amount, tag, type, date, userId, description } = req.body;

  try {
    if (!amount || !tag || !date || !userId || !description || !type) {
      throw new ApiError(400, "Enter all details");
    }

    const user = await User.findByPk(userId);

    if (user) {
      const income = await Income.create({
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

      user.totalBudget = (user.totalBudget || 0) + amount;
      user.currentBalance = (user.currentBalance || 0) + amount;

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Income added successfully",
        income,
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

export const updateIncome = async (req, res) => {
  const { id } = req.params;
  const { amount, tag, type, date, userId, description } = req.body;

  try {
    const existingIncome = await Income.findByPk(id);
    if (!existingIncome) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    // Update income details
    existingIncome.amount = amount ?? existingIncome.amount;
    existingIncome.tag = tag ?? existingIncome.tag;
    existingIncome.type = type ?? existingIncome.type;
    existingIncome.date = date ?? existingIncome.date;
    existingIncome.userId = userId ?? existingIncome.userId;
    existingIncome.description = description ?? existingIncome.description;

    // Save the updated income details
    await existingIncome.save();

    return res.status(200).json({
      success: true,
      message: "Income details updated successfully",
      income: existingIncome,
    });
  } catch (error) {
    console.error("Error updating income details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getIncome = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find income for the user
    const userIncome = await Income.findAll({
      where: {
        userId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Income details retrieved successfully",
      income: userIncome,
    });
  } catch (error) {
    console.error("Error fetching income details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteIncome = async (req, res) => {
  const { id } = req.params; // Assuming incomeId is passed in the URL parameters

  try {
    // Find the income record by ID
    const income = await Income.findByPk(id);

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    await income.destroy();

    return res.status(200).json({
      success: true,
      message: "Income deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting income:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
