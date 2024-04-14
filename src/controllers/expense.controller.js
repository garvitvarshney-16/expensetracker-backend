import { Expense } from "../models/expense.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const addExpense = async (req, res) => {
  const { amount, tag, date, userId, description } = req.body;

  try {
    if (!amount || !tag || !date || !userId || !description) {
      throw new ApiError(400, "Enter all details");
    }

    const expense = await Expense.create({
      amount,
      tag,
      date,
      userId,
      description,
    });

    const user = await User.findByPk(userId);

    if (user) {
      user.totalExpense = (user.totalExpense || 0) + amount;
      user.currentBalance = user.currentBalance - amount;

      await user.save();
    } else {
      throw new ApiError(404, "User not defined");
    }

    return res.status(200).json({
      success: true,
      message: "Expense added successfully",
      expense,
    });
  } catch (error) {
    console.error("Error adding income:", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};


export const deleteExpense = async(req, res) => {
  

}



