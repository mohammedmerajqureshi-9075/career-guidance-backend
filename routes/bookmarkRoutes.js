import express from "express";
import { addBookmark, removeBookmark, getUserBookmarks } from "../controllers/bookmarkController.js";
import { userAuthToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", userAuthToken, addBookmark);
router.delete("/", userAuthToken, removeBookmark);
router.get("/", userAuthToken, getUserBookmarks);

export default router;
