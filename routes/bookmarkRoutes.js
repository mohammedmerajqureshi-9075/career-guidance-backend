import express from "express";
import { body } from "express-validator";
import { userAuthToken } from "../middlewares/authMiddleware.js";
import { addBookmark, getUserBookmarks, removeBookmark } from "../controllers/bookmarkControllers.js";
import { validate } from "../middlewares/validateMiddleware.js";

const bookmarkRouter = express.Router();

// ✅ Add Bookmark Validation
const addBookmarkValidation = [
  body("blogId").isMongoId().withMessage("Invalid blogId format"),
];

// ✅ Remove Bookmark Validation
const removeBookmarkValidation = [
  body("blogId").isMongoId().withMessage("Invalid blogId format"),
];

// Routes
bookmarkRouter.post("/create", userAuthToken, addBookmarkValidation, validate, addBookmark);
bookmarkRouter.delete("/delete", userAuthToken, removeBookmarkValidation, validate, removeBookmark);
bookmarkRouter.get("/getall", userAuthToken, getUserBookmarks);

export default bookmarkRouter;
