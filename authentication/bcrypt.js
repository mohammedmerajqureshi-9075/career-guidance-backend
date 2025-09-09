import bcrypt from "bcrypt";

export const HashePassword = async (plainPassword) => {
  try {
    const password = await bcrypt.hash(plainPassword, 10);
    return password;
  } catch (error) {
    console.log("Error occurred while hashing password:", error.message);
    return null;
  }
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    console.log("Error occurred while comparing password:", error.message);
    return false;
  }
};