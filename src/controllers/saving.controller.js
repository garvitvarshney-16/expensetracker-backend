import { sequelize } from "../db/index.js";
import { Expense } from "../models/expense.model.js";
import { Income } from "../models/income.model.js";
import { Saving } from "../models/saving.model.js";

export const calculateMonthlySavings = async (req, res) => {
  const { userId, month, year } = req.body;

  try {
    if (userId && month && year) {
      // Check if a savings record already exists for the specified month
      const existingSaving = await Saving.findOne({
        where: { userId, savingMonth: month, savingYear: year },
      });

      if (existingSaving) {
        return res.status(403).json({
          success: false,
          message: "Savings record already exists for the specified month",
        });
      }
    }
    const expenses = await Expense.findAll({
      where: {
        userId,
        date: sequelize.where(
          sequelize.fn("YEAR", sequelize.col("date")),
          year
        ),
        date: sequelize.where(
          sequelize.fn("MONTH", sequelize.col("date")),
          month
        ),
      },
      attributes: [
        [sequelize.fn("SUM", sequelize.col("amount")), "totalExpense"],
      ],
      raw: true,
    });

    // Fetch income for the user for the specified month and year
    const incomes = await Income.findAll({
      where: {
        userId,
        date: sequelize.where(
          sequelize.fn("YEAR", sequelize.col("date")),
          year
        ),
        date: sequelize.where(
          sequelize.fn("MONTH", sequelize.col("date")),
          month
        ),
      },
      attributes: [
        [sequelize.fn("SUM", sequelize.col("amount")), "totalIncome"],
      ],
      raw: true,
    });

    // Calculate savings for the specified month and year
    const totalExpense =
      expenses.length > 0 ? expenses[0].totalExpense || 0 : 0;
    const totalIncome = incomes.length > 0 ? incomes[0].totalIncome || 0 : 0;
    const savingsAmount = totalIncome - totalExpense;

    // Create or update savings record for the user for the specified month and year
    await Saving.upsert({
      userId,
      savingAmount: savingsAmount,
      savingMonth: month,
      savingYear: year,
      expenseInMonth: totalExpense,
      salaryMonth: totalIncome,
      description: "Monthly savings calculation",
    });

    return res.status(200).json({
      success: true,
      message: "Monthly savings calculated successfully",
      savingsAmount,
    });
  } catch (error) {
    console.error("Error calculating monthly savings:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const calculateYearlySavings = async (req, res) => {
  const { userId, year } = req.body;

  try {
    const yearlySavings = await Saving.findAll({
      where: {
        userId,
        savingYear: year,
      },
      attributes: [
        [sequelize.fn("SUM", sequelize.col("savingAmount")), "totalSavings"],
      ],
      raw: true,
    });

    const totalSavings =
      yearlySavings.length > 0 ? yearlySavings[0].totalSavings || 0 : 0;

    return res.status(200).json({
      success: true,
      message: totalSavings,
    });
  } catch (error) {
    console.error("Error calculating yearly savings:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
