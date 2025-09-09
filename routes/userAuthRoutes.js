import express from 'express';
import { body } from 'express-validator';
import { userLoginControllers, userLogoutControllers, userProfileControllers, userRegisterControllers, userVerifyAccount } from '../controllers/userAuthControllers.js';
import { userAuthToken } from '../middlewares/authMiddleware.js';



let userRoutes = express.Router();

userRoutes.post("/register", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("fullname")
    .isLength({ min: 3 })
    .withMessage("First name must be atlease 3 charecters long")
], userRegisterControllers);

userRoutes.post('/login', [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").isLength({ min: 5 }).withMessage("Password must be atleast 5 charecters long")
], userLoginControllers);

userRoutes.post("/verify" ,userAuthToken, userVerifyAccount);

userRoutes.get('/logout',userAuthToken, userLogoutControllers)
userRoutes.get('/profile', userAuthToken, userProfileControllers);


export default userRoutes;









