import express from "express";
import { body, param } from "express-validator";
import {
  createCareer,
  deleteCareer,
  getAllCareers,
  getCareerById,
  updateCareer,
} from "../controllers/careerController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { adminProtect, userAuthToken } from "../middlewares/authMiddleware.js";

const careerRouter = express.Router();

// Validation rules for creating a career (all required)
const createCareerValidation = [
  body("Technology").isString().withMessage("Technology must be a string"),
  body("AverageSalary").isNumeric().withMessage("AverageSalary must be a number"),
  body("Title").isString().withMessage("title must be a string"),
  body("Description").isString().withMessage("description must be a string"),
  body("Difficulty")
    .isIn(["easy", "medium", "hard"])
    .withMessage("Difficulty must be easy, medium, or hard"),
  body("Popularity").isString().withMessage("Popularity must be a string"),
  body("JobGrowth")
    .isIn(["high", "low"])
    .withMessage("JobGrowth must be high or low"),
  body("WorkLifeBalance")
    .isIn(["good", "bad"])
    .withMessage("WorkLifeBalance must be good or bad"),
  body("EducationRequired").isString().withMessage("EducationRequired must be a string"),
  body("Duration").isString().withMessage("Duration must be a string"),
  body("KeyRequirements").isArray().withMessage("KeyRequirements must be an array"),
  body("RelatedCareers").isArray().withMessage("RelatedCareers must be an array"),
  body("SkillsTechnologies").isArray().withMessage("SkillsTechnologies must be an array"),
  body("TopCompanies").isArray().withMessage("TopCompanies must be an array"),
  body("role")
    .isIn(["After10", "After12Arts", "After12Science", "After12Commerce"])
    .withMessage("Invalid role"),
];

// Validation rules for updating a career (fields optional)
const updateCareerValidation = [
  body("Technology").optional().isString().withMessage("Technology must be a string"),
  body("AverageSalary").optional().isNumeric().withMessage("AverageSalary must be a number"),
  body("Title").optional().isString().withMessage("title must be a string"),
  body("Description").optional().isString().withMessage("description must be a string"),
  body("Difficulty").optional().isIn(["easy", "medium", "hard"])
    .withMessage("Difficulty must be easy, medium, or hard"),
  body("Popularity").optional().isString().withMessage("Popularity must be a string"),
  body("JobGrowth").optional().isIn(["high", "low"])
    .withMessage("JobGrowth must be high or low"),
  body("WorkLifeBalance").optional().isIn(["good", "bad"])
    .withMessage("WorkLifeBalance must be good or bad"),
  body("EducationRequired").optional().isString().withMessage("EducationRequired must be a string"),
  body("Duration").optional().isString().withMessage("Duration must be a string"),
  body("KeyRequirements").optional().isArray().withMessage("KeyRequirements must be an array"),
  body("RelatedCareers").optional().isArray().withMessage("RelatedCareers must be an array"),
  body("SkillsTechnologies").optional().isArray().withMessage("SkillsTechnologies must be an array"),
  body("TopCompanies").optional().isArray().withMessage("TopCompanies must be an array"),
  body("role").optional().isIn(["After10", "After12Arts", "After12Science", "After12Commerce"])
    .withMessage("Invalid role"),
];

// Validation rule for :id parameter
const idValidation = [param("id").isMongoId().withMessage("Invalid ID format")];

// Routes
careerRouter.post("/", createCareerValidation, validate,adminProtect, createCareer);       // Create Career
careerRouter.get("/",userAuthToken, getAllCareers);                                        // Get All Careers
careerRouter.get("/:id", idValidation, validate,userAuthToken, getCareerById);             // Get Career by ID
careerRouter.put("/:id", idValidation.concat(updateCareerValidation), validate,adminProtect, updateCareer); // Update Career
careerRouter.delete("/:id", idValidation, validate,adminProtect, deleteCareer);           // Delete Career

export default careerRouter;
