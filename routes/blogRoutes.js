import express from "express";
import { body, param } from "express-validator";
import { 
  createBlog, 
  deleteBlog, 
  getAllBlogs, 
  getBlogById, 
  updateBlog 
} from "../controllers/blogControllers.js";

import { adminProtect, userAuthToken } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";

const blogRouter = express.Router();

// Validation rules
const createBlogValidation = [
  body("title").isString().notEmpty().withMessage("Title is required and must be a string"),
  body("content")
    .isString()
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters long"),
  body("author").optional().isString().withMessage("Author must be a string"),
];

const updateBlogValidation = [
  body("title").optional().isString().withMessage("Title must be a string"),
  body("content")
    .optional()
    .isString()
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters long"),
  body("author").optional().isString().withMessage("Author must be a string"),
];

const idValidation = [param("id").isMongoId().withMessage("Invalid blog ID")];

// Routes
blogRouter.post("/create", adminProtect, createBlogValidation, validate, createBlog);
blogRouter.put("/update/:id", adminProtect, idValidation.concat(updateBlogValidation), validate, updateBlog);
blogRouter.delete("/delete/:id", adminProtect, idValidation, validate, deleteBlog);
blogRouter.get("/all", userAuthToken, getAllBlogs);
blogRouter.get("/get/:id", userAuthToken, idValidation, validate, getBlogById);

export default blogRouter;
