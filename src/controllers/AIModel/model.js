import { GoogleGenerativeAI } from "@google/generative-ai";
import { Expense } from "../../models/expense.model.js";
import { Income } from "../../models/income.model.js";
import { Saving } from "../../models/saving.model.js";

const API = process.env.API;
const genAI = new GoogleGenerativeAI(API);

export const suggestTips = async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = req.body;
  // const constant = 'in hindi';

  try {
    const result = await model.generateContentStream(`${prompt.promt}`);
    const response = await result.response;
    const text = response.text();
    res.status(201).json({ text });
  } catch (error) {
    res.status(501).json({ message: error });
  }
};

// export const assessFinancialHealth = async (req, res) => {
//   const { userId } = req.body;

//   try {
//     // Fetch user's financial data from the database
//     const [expenses, incomes, savings] = await Promise.all([
//       Expense.findAll({ where: { userId } }),
//       Income.findAll({ where: { userId } }),
//       Saving.findAll({ where: { userId } }),
//     ]);

//     // Check if any of the fetched arrays is undefined
//     if (!expenses || !incomes || !savings) {
//       return res.status(500).json({
//         success: false,
//         message: "Failed to fetch user's financial data",
//       });
//     }

//     // Calculate financial metrics based on the fetched data
//     const totalExpenses = expenses.reduce(
//       (acc, expense) => acc + expense.amount,
//       0
//     );
//     const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
//     const totalSavings = savings.reduce(
//       (acc, saving) => acc + saving.amount,
//       0
//     );

//     // Perform financial health assessment
//     const savingsRate = (totalSavings / totalIncome) * 100;

//     // Generate recommendations based on assessment
//     const recommendations = [];

//     if (savingsRate < 20) {
//       recommendations.push(
//         "Increase your savings rate to build a stronger financial safety net."
//       );
//     }

//     // Return assessment results and recommendations
//     return res.status(200).json({
//       success: true,
//       message: "Financial health assessment completed successfully",
//       data: {
//         totalExpenses,
//         totalIncome,
//         totalSavings,
//         savingsRate,
//         recommendations,
//       },
//     });
//   } catch (error) {
//     console.error("Error assessing financial health:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };
