import User from "../models/userAuthModel.js";

export let userRegisterService = async (fullname, email, phone, password, otp) => {
  try {
    if (!fullname || !email || !password || !phone) {
      throw new Error("All fields are required");
    }

    const user = await User.create({
      fullname,
      email,
      phone,
      password,
      otp, 
    });

    return user;
  } catch (error) {
    console.log("Error in service while registering user:", error.message);
    return null;
  }
};
