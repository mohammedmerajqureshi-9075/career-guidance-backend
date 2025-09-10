import express from "express";
import { addBookmark, removeBookmark, getUserBookmarks } from "../controllers/bookmarkController.js";
// import { userAuthToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",  addBookmark);
router.delete("/",  removeBookmark);
router.get("/",  getUserBookmarks);

export default router;
