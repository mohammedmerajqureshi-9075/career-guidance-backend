import Bookmark from "../models/bookmarkModel.js";

export const addBookmarkService = async (userId, targetId, targetType) => {
  return await Bookmark.create({ user: userId, target: targetId, targetType });
};

export const removeBookmarkService = async (userId, targetId, targetType) => {
  return await Bookmark.findOneAndDelete({ user: userId, target: targetId, targetType });
};

export const getUserBookmarksService = async (userId) => {
  return await Bookmark.find({ user: userId }).populate("target");
};
