import express from "express";
import { body, validationResult } from "express-validator";
import { adminProtect } from "../middlewares/authMiddleware.js";
import { getAdminProfile, loginAdmin, registerAdmin } from "../controllers/adminControllers.js";

const adminRouter = express.Router();


// SubAdmin Register Validation
const AdminValidation = [
  body("fullname")
    .notEmpty().withMessage("Full name is required")
    .isLength({ min: 3 }).withMessage("Full name must be at least 3 characters"),

  body("email")
  .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please enter a valid email"),

  body("password")
    .optional() 
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];

//Subadmin Login Validation
const loginValidation = [
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please enter a valid email"),

  body("password")
    .notEmpty().withMessage("Password is required")
];





const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Register New SubAdmin
adminRouter.post("/register", AdminValidation, validateRequest, registerAdmin);

// Public Route
adminRouter.post("/login", loginValidation, validateRequest, loginAdmin);

// Get Single SubAdmin by ID
adminRouter.get("/profile", adminProtect, getAdminProfile);



export default adminRouter;
