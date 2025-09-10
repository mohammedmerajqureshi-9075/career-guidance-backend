// import { createBlogService } from "../services/blogService.js";

import { createBlogService } from "../services/blogServices.js";
import { updateBlogService } from "../services/blogServices.js";
import { deleteBlogService } from "../services/blogServices.js";
import { getBlogByIdService } from "../services/blogServices.js";
import { getAllBlogsService } from "../services/blogServices.js";





export const createBlog = async (req, res) => {
  try {
    const blogData = req.body;

    const newBlog = await createBlogService(blogData);

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: newBlog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;      // URL se id aayegi
    const updateData = req.body;    // body me updated fields

    const updatedBlog = await updateBlogService(id, updateData);

    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};



//  Controller: Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await deleteBlogService(id);

    if (!deletedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully"
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


//  Controller: Get All Blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await getAllBlogsService();

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



//  Controller: Get One Blog
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await getBlogByIdService(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




