import express from "express";
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from "../controllers/blogControllers.js";
import { adminProtect, userAuthToken } from "../middlewares/authMiddleware.js";



const blogRouter = express.Router();

blogRouter.post("/create", adminProtect,createBlog);
blogRouter.put("/update/:id",adminProtect, updateBlog);
blogRouter.delete("/delete/:id",adminProtect,deleteBlog)
blogRouter.get("/all",userAuthToken,getAllBlogs)
blogRouter.get("/get/:id",userAuthToken,getBlogById)


export default blogRouter;