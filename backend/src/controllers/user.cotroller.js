import { readJSON } from "../utils/file.js";

export const getUsers = (req, res) => {
  try {
    const users = readJSON("users.json");

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to read usrs database",
    });
  }
};
