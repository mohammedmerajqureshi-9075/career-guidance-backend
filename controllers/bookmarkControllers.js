import { addBookmarkService, removeBookmarkService, getUserBookmarksService } from "../services/bookmarkServices.js";

export const addBookmark = async (req, res) => {
  try {
    const { targetId, targetType } = req.body;
    const bookmark = await addBookmarkService(req.user._id, targetId, targetType);

    res.status(201).json({
      success: true,
      message: `${targetType} bookmarked successfully`,
      data: bookmark
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to add bookmark"
    });
  }
};

export const removeBookmark = async (req, res) => {
  try {
    const { targetId, targetType } = req.body;
    const deleted = await removeBookmarkService(req.user._id, targetId, targetType);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Bookmark not found" });
    }

    res.status(200).json({
      success: true,
      message: `${targetType} bookmark removed successfully`
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to remove bookmark"
    });
  }
};

export const getUserBookmarks = async (req, res) => {
  try {
    const bookmarks = await getUserBookmarksService(req.user._id);

    res.status(200).json({
      success: true,
      count: bookmarks.length,
      data: bookmarks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch bookmarks"
    });
  }
};
