import Bookmark from "../models/bookmarkModel.js";

// Add Bookmark
export const addBookmarkService = async (userId, blogId) => {
  try {
    const bookmark = await Bookmark.create({ user: userId, blog: blogId });
    return bookmark;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Remove Bookmark
export const removeBookmarkService = async (userId, blogId) => {
  try {
    const deleted = await Bookmark.findOneAndDelete({ user: userId, blog: blogId });
    return deleted;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all bookmarks of a user
export const getUserBookmarksService = async (userId) => {
  try {
    const bookmarks = await Bookmark.find({ user: userId }).populate("blog");
    return bookmarks;
  } catch (error) {
    throw new Error(error.message);
  }
};
