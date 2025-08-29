import jwt from "jsonwebtoken";
import BlacklistedTokenModel from "../models/blacklistedTokenModel.js";
import User from "../models/userAuthModel.js";



// import BlacklistedTokenModel if you use it

export const userAuthToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const tokenFromCookie = req.cookies?.token;
    const tokenFromHeader = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    const token = tokenFromCookie || tokenFromHeader;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized Access - No token provided" });
    }

    // OPTIONAL: Check blacklisted tokens
    const isBlacklisted = await BlacklistedTokenModel.findOne({ token });
    if (isBlacklisted) return res.status(401).json({ message: "Token is blacklisted" });

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded token:", decodeToken);
    const user = await User.findById(decodeToken._id);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};