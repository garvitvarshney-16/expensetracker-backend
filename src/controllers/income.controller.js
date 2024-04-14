import { Income } from "../models/income.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const addIncome = async (req, res) => {
  const { amount, tag, date, userId, description } = req.body;

  try {
    if (!amount || !tag || !date || !userId || !description) {
      throw new ApiError(400, "Enter all details");
    }

    const income = await Income.create({
      amount,
      tag,
      date,
      userId,
      description,
    });

    const user = await User.findByPk(userId);

    if (user) {
      user.totalBudget = (user.totalBudget || 0) + amount;
      user.currentBalance = (user.currentBalance || 0) + amount;

      await user.save();
    } else {
      throw new ApiError(404, "User not defined");
    }

    return res.status(200).json({
      success: true,
      message: "Income added successfully",
      income,
    });
  } catch (error) {
    console.error("Error adding income:", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
