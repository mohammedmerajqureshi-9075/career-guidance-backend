import { validationResult } from "express-validator";
import fs from "fs";
import path from "path";
import hbs from "hbs";
import { fileURLToPath } from "url";
import { dirname } from "path";;
import { generateOtp } from "../utils/generateOtp.js";
import sendMail from "../utils/email.js";
import User from "../models/userAuthModel.js";
import { HashePassword } from "../authentication/bcrypt.js";
import { generateToken } from "../authentication/jwt.js";
import { userRegisterService } from "../services/userAuthServices.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let loadTemplate = (templateName, replacements) => {
  let templatePath = path.join(__dirname, "../emailTemplate", templateName);
  console.log("Template Path:", templatePath);
  let source = fs.readFileSync(templatePath, "utf8");
  let template = hbs.compile(source);
  return template(replacements);
};



export let userRegisterControllers = async (req, res) => {
  console.log(req.body)
  try {
    const otp = generateOtp();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, phone, password } = req.body;

    const alreadyUser = await User.findOne({ email }).select("+password");
    if (alreadyUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await HashePassword(password);
    if (!hashedPassword) {
      return res.status(500).json({ message: "Failed to hash password" });
    }

    const user = await userRegisterService(fullname, email, phone, hashedPassword, otp);
    if (!user) {
      return res.status(500).json({ message: "Failed to register user" });
    }

    const htmlTemplate = loadTemplate("otpTemplate.hbs", {
      title: "You Succesfully Register In Shopcardd",
      username: user.fullname,
      email: user.email,
      phone: user.phone,
      employeeId: user.otp,
      message: "After Login Verify Otp",
      year: new Date().getFullYear(),
    });

    await sendMail({
      email: user.email,
      subject: "Dear Employee Welcome To CreerPath",
      html: htmlTemplate,
    });

    const token = generateToken(user._id);
    res.status(201).json({
      message: "User registered successfully",
      token,
      user,
    });

  } catch (error) {
    console.log("Error in controller while registering user:", error.message);
    res.status(500).json({ message: "Server error while registering user" });
  }
};