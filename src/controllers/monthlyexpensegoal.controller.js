import { MonthlyExpenseGoal } from "../models/monthlyexpensegoal.model.js";


export const setMonthlyExpenseGoal = async (req, res) => {
  const { amount, month, year, userId } = req.body;

  try {
    // Check if the user already has a monthly expense goal for the specified month and year
    let goal = await MonthlyExpenseGoal.findOne({
      where: { userId, month, year },
    });

    if (goal) {
      // If goal exists, update it
      goal.amount = amount;
      await goal.save();
    } else {
      // If goal does not exist, create a new one
      goal = await MonthlyExpenseGoal.create({
        amount,
        month,
        year,
        userId,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Monthly expense goal set successfully",
      goal,
    });
  } catch (error) {
    console.error("Error setting monthly expense goal:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Controller to get the monthly expense goal for a user
export const getMonthlyExpenseGoal = async (req, res) => {
  const { userId, month, year } = req.body;

  try {
    // Find the monthly expense goal for the specified user, month, and year
    const goal = await MonthlyExpenseGoal.findOne({
      where: { userId, month, year },
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Monthly expense goal not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Monthly expense goal retrieved successfully",
      goal,
    });
  } catch (error) {
    console.error("Error fetching monthly expense goal:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Controller to delete the monthly expense goal for a user
export const deleteMonthlyExpenseGoal = async (req, res) => {
  const { userId, month, year } = req.body;

  try {
    // Find the monthly expense goal for deletion
    const goal = await MonthlyExpenseGoal.findOne({
      where: { userId, month, year },
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Monthly expense goal not found",
      });
    }

    // Delete the monthly expense goal
    await goal.destroy();

    return res.status(200).json({
      success: true,
      message: "Monthly expense goal deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting monthly expense goal:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
