import moment from "moment";
import { Op } from "sequelize";
import { sequelize } from "../db/index.js";
import { Expense } from "../models/expense.model.js";
import { Transaction } from "../models/transaction.model.js";
import { Saving } from "../models/saving.model.js";

export const getRecentTransaction = async (req, res) => {
  const { userId } = req.body;

  try {
    const recentTransactions = await Transaction.findAll({
      where: { userId },
      order: [["date", "DESC"]],
      limit: 5,
    });

    return res.status(200).json({
      success: true,
      message: "Recent transactions retrieved successfully",
      transaction: recentTransactions,
    });
  } catch (error) {
    console.error("Error retrieving recent transactions:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

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

export const getCurrentYearFinancialData = async (req, res) => {
  const { userId } = req.params;
  const currentYear = moment().year();
  const currentMonth = moment().month() + 1;

  try {
    // Fetch expenses and savings for the current year
    const [expenses, savings] = await Promise.all([
      Expense.findAll({
        where: {
          userId,
          date: {
            [Op.between]: [
              moment(`${currentYear}-01-01`, "YYYY-MM-DD"),
              moment(`${currentYear}-${currentMonth}-31`, "YYYY-MM-DD"),
            ],
          },
        },
        attributes: [
          [sequelize.fn("MONTH", sequelize.col("date")), "month"],
          [sequelize.fn("SUM", sequelize.col("amount")), "totalExpense"],
        ],
        group: [sequelize.fn("MONTH", sequelize.col("date"))],
        raw: true,
      }),
      Saving.findAll({
        where: {
          userId,
          savingYear: currentYear,
          savingMonth: { [Op.lte]: currentMonth },
        },
        attributes: [
          [sequelize.fn("MONTH", sequelize.col("savingMonth")), "month"],
          [sequelize.fn("SUM", sequelize.col("savingAmount")), "totalSaving"],
        ],
        group: [sequelize.fn("MONTH", sequelize.col("savingMonth"))],
        raw: true,
      }),
    ]);

    // Prepare the response
    const financialData = Array.from({ length: currentMonth }, (_, i) => {
      const month = i + 1;
      const expenseData = expenses.find((item) => item.month === month) || {
        totalExpense: 0,
      };
      const savingData = savings.find((item) => item.month === month) || {
        totalSaving: 0,
      };
      return {
        month,
        totalExpense: expenseData.totalExpense || 0,
        totalSaving: savingData.totalSaving || 0,
      };
    });

    // Return the response
    return res.status(200).json({
      success: true,
      message: "Current year's financial data retrieved successfully",
      data: financialData,
    });
  } catch (error) {
    console.error("Error fetching current year's financial data:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
