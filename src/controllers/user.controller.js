import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const signInUser = async (req, res) => {
  try {
    const { fullname, email, accessToken, profilePicture } = req.body;

    let existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: `Welcome back, ${existingUser.fullname}`,
        user: existingUser,
      });
    }

    // If user does not exist, create a new user
    if (!fullname || !email || !accessToken || !profilePicture) {
      throw new ApiError(400, "Enter all details");
    }

    const newUser = await User.create({
      fullname,
      email,
      accessToken,
      profilePicture,
    });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    fullname,
    email,
    dateOfBirth,
    profilePicture,
    totalBudget,
    totalExpense,
    currentBalance,
  } = req.body;

  try {
    const existingUser = await User.findByPk(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    existingUser.fullname = fullname ?? existingUser.fullname;
    existingUser.email = email ?? existingUser.email;
    existingUser.dateOfBirth = dateOfBirth ?? existingUser.dateOfBirth;
    existingUser.profilePicture = profilePicture ?? existingUser.profilePicture;
    existingUser.totalBudget = totalBudget ?? existingUser.totalBudget;
    existingUser.totalExpense = totalExpense ?? existingUser.totalExpense;
    existingUser.currentBalance = currentBalance ?? existingUser.currentBalance;

    await existingUser.save();

    return res.status(200).json({
      success: true,
      message: "User details updated successfully",
      user: existingUser,
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getUserDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User details retrieved successfully",
      user,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete the user
    await user.destroy();

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
