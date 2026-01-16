import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
} from "../controllers/user.cotroller.js";

const router = express.Router();

// GET /api/users
router.get("/", getUsers);
//POST
router.post("/", createUser);
//PUT
router.put("/:id", updateUser);

export default router;
