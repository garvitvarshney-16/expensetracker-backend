import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const signInUser = async (req, res) => {
  try {
    const { id, fullname, email, dateOfBirth, profilePicture } = req.body;

    let user = await User.findByPk(id);

    if (user) {
      return res.status(200).json({
        success: true,
        message: `Welcome, ${user.fullname}`,
        user,
      });
    }

    if (!id || !fullname || !email || !dateOfBirth || !profilePicture) {
      throw new ApiError(400, "Enter all details");
    }

    user = await User.create({
      id,
      fullname,
      email,
      dateOfBirth,
      profilePicture,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, user, "user registered successfully"));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};




