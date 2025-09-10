import express from "express";

import { userAuthToken } from "../middlewares/authMiddleware.js";
import { addBookmark, getUserBookmarks, removeBookmark } from "../controllers/bookmarkControllers.js";


const bookmarkRouter = express.Router();

bookmarkRouter.post("/create", userAuthToken, addBookmark);
bookmarkRouter.delete("/delete", userAuthToken, removeBookmark);
bookmarkRouter.get("/getall", userAuthToken, getUserBookmarks);

export default bookmarkRouter;
