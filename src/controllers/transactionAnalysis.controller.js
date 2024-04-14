import { Op } from "sequelize";
import { sequelize } from "../db/index.js";
import { Expense } from "../models/expense.model.js";

export const calculateMonthlyExpenditure = async (req, res) => {
  const { userId, year, month } = req.body;

  try {
    // Fetch expenses for the user for the specified month and year
    const monthlyExpenses = await Expense.findAll({
      where: {
        userId,
        [Op.and]: [
          sequelize.where(sequelize.fn("YEAR", sequelize.col("date")), year),
          sequelize.where(sequelize.fn("MONTH", sequelize.col("date")), month),
        ],
      },
      attributes: [
        "tag",
        [sequelize.fn("SUM", sequelize.col("amount")), "totalAmount"],
      ],
      group: ["tag"],
      raw: true,
    });

    return res.status(200).json({
      success: true,
      message: "Monthly expenditure breakdown calculated successfully",
      monthlyExpenses,
    });
  } catch (error) {
    console.error("Error calculating monthly expenditure breakdown:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Function to generate category-wise comparisons
export const generateCategoryComparisons = async (req, res) => {
  const { userId, tag } = req.body;

  try {
    // Fetch expenses for the user grouped by month and category
    const categoryComparisons = await Expense.findAll({
      where: {
        userId,
        tag,
      },
      attributes: [
        [sequelize.fn("MONTH", sequelize.col("date")), "month"],
        [sequelize.fn("YEAR", sequelize.col("date")), "year"],
        [sequelize.fn("SUM", sequelize.col("amount")), "totalAmount"],
      ],
      group: ["month", "year"],
      raw: true,
    });

    return res.status(200).json({
      success: true,
      message: "Category-wise comparisons generated successfully",
      categoryComparisons,
    });
  } catch (error) {
    console.error("Error generating category-wise comparisons:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
