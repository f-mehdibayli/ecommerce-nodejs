import express from 'express';
import { getFavorites, toggleFavorite } from '../controllers/favorite.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post("/:productId", protect, toggleFavorite);
router.get("/", protect, getFavorites);

export default router;