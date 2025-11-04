import express from "express";
import { authorizeRole, protect } from "../middleware/auth.middleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category.controller.js";
const router = express.Router();

router.post("/new", protect, authorizeRole("admin"), createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/:id/update", protect, authorizeRole("admin"), updateCategory);
router.delete("/:id/delete", protect, authorizeRole("admin"), deleteCategory);

export default router;