
import mongoose from "mongoose";

let userSchema = mongoose.Schema({
  fullname: {
      type: String,
      required: true,
      minlength: [3, "First name must be atleast 3 characters"],
  },
  email: {
    type: String,
    required: true,
    minlength: [5, "Email must be atleast 5 characters long"],
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: [10, "Phone number must be at least 10 digits"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },

  otp: {
    type: String,
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
    resetPasswordOtp: {
    type: String,
    default: null,
  },
  resetPasswordOtpExpire: {
    type: Date,
    default: null,
  },
 resetPasswordOtpVerified: {
    type: Boolean,
    default: false,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});


let User = mongoose.model("User",  userSchema);
export default User;
