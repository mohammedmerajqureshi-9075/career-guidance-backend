import Career from "../models/careerModel.js";

// Create
export const createCareerService = async (data) => {
  const career = new Career(data);
  return await career.save();
};

// Get All
export const getAllCareersService = async () => {
  return await Career.find();
};

// Get One
export const getCareerByIdService = async (id) => {
  return await Career.findById(id);
};

// Update
export const updateCareerService = async (id, data) => {
  return await Career.findByIdAndUpdate(id, data, { new: true });
};

// Delete
export const deleteCareerService = async (id) => {
  return await Career.findByIdAndDelete(id);
};
