import express from "express";
import { createBlog, updateBlog } from "../controllers/blogControllers.js";



const blogRouter = express.Router();

blogRouter.post("/create", createBlog);
blogRouter.put("/update/:id", updateBlog);

export default blogRouter;