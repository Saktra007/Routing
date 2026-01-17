import { readJSON, writeJSON } from "../utils/file.js";
import { v4 as uuidv4 } from "uuid";

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

// CREATE new users
export const createUser = (req, res) => {
  try {
    const { name, email } = req.body;

    //Validate input
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    //Read existing usrs
    const users = readJSON("users.json");

    //Check duplicate email
    const exists = users.find((u) => u.email === email);
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    //Create new users object
    const newUser = {
      id: uuidv4(),
      name,
      email,
    };

    //Add to array
    users.push(newUser);

    //Save back to file
    writeJSON("users.json", users);

    //Response
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create users",
    });
  }
};

// PUT update users
export const updateUser = (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;

    //Validate at least one field exists
    if (!name && !email) {
      return res.status(400).json({
        success: false,
        message: "At least one field (name or email) is required",
      });
    }

    //Read existing users
    let users = readJSON("users.json");

    //Find users by ID
    const index = users.findIndex((u) => u.id == userId);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //Check if email already used by another users
    if (email) {
      const emailExists = users.find(
        (u) => u.email === email && u.id != userId,
      );
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }
    }

    //Update user fields
    users[index] = {
      ...users[index],
      name: name ?? users[index].name,
      email: email ?? users[index].email,
    };

    //Save to JSON
    writeJSON("users.json", users);

    res.json({
      success: true,
      message: "User updated successfully",
      data: users[index],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
};

//DELETE user
export const daleteUsr = (req, res) => {
  try {
    const userId = req.params.id;

    //Read existing users
    let users = readJSON("users.json");

    //Find user index
    const index = users.findIndex((u) => u.id == userId);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //Remove user from array
    const deleteUser = users[index];
    users.splice(index, 1);

    //Save updated data
    writeJSON("users.json", users);

    res.json({
      success: true,
      message: "User deleted successfully",
      data: deleteUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete users",
    });
  }
};
