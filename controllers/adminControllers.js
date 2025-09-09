import { createAdmin } from "../services/adminServices.js";
import Admin from "../models/adminModel.js";
import { generateToken } from "../authentication/jwt.js";

export const registerAdmin = async (req, res) => {
  console.log("hello",req.body)
  try {
// console.log("hello",req.body)


    const { email } = req.body;
    console.log(email)

    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const subAdmin = await createAdmin(req.body);
    res.status(201).json({ message: "SubAdmin created successfully", subAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(admin._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: admin._id,
        fullname: admin.fullname,
        email: admin.email,
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getAdminProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({
      message: "Admin profile fetched successfully.",
      data: req.user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch admin profile.",
      error: err.message,
    });
  }
};
