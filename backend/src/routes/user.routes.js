import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  daleteUsr,
} from "../controllers/user.cotroller.js";

const router = express.Router();

// GET /api/users
router.get("/", getUsers);

//POST
router.post("/", createUser);

//PUT
router.put("/:id", updateUser);
//DELETE
router.delete("/:id", daleteUsr);
export default router;
