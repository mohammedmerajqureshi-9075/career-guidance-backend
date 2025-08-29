import express from 'express';
import { body } from 'express-validator';
import { userRegisterControllers } from '../controllers/userAuthControllers.js';



let userRoutes = express.Router();

userRoutes.post("/register", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("fullname")
    .isLength({ min: 3 })
    .withMessage("First name must be atlease 3 charecters long")
], userRegisterControllers);




export default userRoutes;









