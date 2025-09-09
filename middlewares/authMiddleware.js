import jwt from "jsonwebtoken";
import BlacklistedTokenModel from "../models/blacklistedTokenModel.js";
import User from "../models/userAuthModel.js";
import Admin from "../models/adminModel.js";



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

//admin
// admin middleware
export const adminProtect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY); // keep consistent key
    const admin = await Admin.findById(decoded._id).select("-password");

    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    req.user = admin; // attach actual admin object
    next();
  } catch (err) {
    console.error("Admin Auth Error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
