import Admin from "../models/adminModel.js";

export const createAdmin = async (data) => {
  return await Admin.create(data);
};

