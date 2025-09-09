import mongoose from "mongoose";
import bcrypt from "bcrypt";

const AdminSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
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
  }
}, { timestamps: true });

AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

AdminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

let Admin= mongoose.model("Admin", AdminSchema);
export default Admin
