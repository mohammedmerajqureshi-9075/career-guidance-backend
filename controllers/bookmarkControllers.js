import { 
  addBookmarkService, 
  removeBookmarkService, 
  getUserBookmarksService 
} from "../services/bookmarkServices.js";

// Add bookmark
export const addBookmark = async (req, res) => {
  try {
    const { blogId } = req.body;
    const userId = req.user._id; // Auth middleware se aayega

    const bookmark = await addBookmarkService(userId, blogId);

    res.status(201).json({
      success: true,
      message: "Blog bookmarked successfully",
      data: bookmark,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to add bookmark",
    });
  }
};

// Remove bookmark
export const removeBookmark = async (req, res) => {
  try {
    const { blogId } = req.body;
    const userId = req.user._id;

    const deleted = await removeBookmarkService(userId, blogId);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Bookmark not found" });
    }

    res.status(200).json({
      success: true,
      message: "Bookmark removed successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to remove bookmark",
    });
  }
};

// Get user bookmarks
export const getUserBookmarks = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookmarks = await getUserBookmarksService(userId);

    res.status(200).json({
      success: true,
      count: bookmarks.length,
      data: bookmarks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch bookmarks",
    });
  }
};
