import Blog from "../models/blogModel.js";
// import Blog from "../models/blogModel.js";


// 🟢 Service: Create a new blog
export const createBlogService = async (blogData) => {
  try {
    // Blog schema ke hisaab se ek naya document banayenge
    const blog = new Blog(blogData);

    // Database me save karenge
    await blog.save();

    // Wapas newly created blog return karenge
    return blog;
  } catch (error) {
    throw new Error(error.message); // Controller is error ko catch karega
  }
};





// 🟢 Service: Update Blog
export const updateBlogService = async (id, updateData) => {
  try {
    // Blog findByIdAndUpdate se update hoga
    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,        // naya updated document return karega
      runValidators: true // schema validations apply rahenge
    });

    return updatedBlog;
  } catch (error) {
    throw new Error(error.message);
  }
};



// 🟢 Service: Delete Blog
export const deleteBlogService = async (id) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    return deletedBlog;
  } catch (error) {
    throw new Error(error.message);
  }
};


// 🟢 Service: Get All Blogs
export const getAllBlogsService = async () => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // latest first
    return blogs;
  } catch (error) {
    throw new Error(error.message);
  }
};


// 🟢 Service: Get One Blog by ID
export const getBlogByIdService = async (id) => {
  try {
    const blog = await Blog.findById(id);
    return blog;
  } catch (error) {
        throw new Error(error.message);
  }
};


