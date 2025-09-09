import express from "express";
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from "../controllers/blogControllers.js";



const blogRouter = express.Router();

blogRouter.post("/create", createBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.delete("/delete/:id",deleteBlog)
blogRouter.get("/all",getAllBlogs)
blogRouter.get("/get/:id",getBlogById)


export default blogRouter;