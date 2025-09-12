import { createCareerService, deleteCareerService, getAllCareersService, getCareerByIdService, updateCareerService } from "../services/careerService.js";

// Create
export const createCareer = async (req, res) => {
  try {
    const career = await createCareerService(req.body);
    res.status(201).json({ message: "Career created successfully", career });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All
export const getAllCareers = async (req, res) => {
  try {
    const careers = await getAllCareersService();
    res.status(200).json(careers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get One
export const getCareerById = async (req, res) => {
  try {
    const career = await getCareerByIdService(req.params.id);
    if (!career) return res.status(404).json({ message: "Career not found" });
    res.status(200).json(career);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
export const updateCareer = async (req, res) => {
  try {
    const career = await updateCareerService(req.params.id, req.body);
    if (!career) return res.status(404).json({ message: "Career not found" });
    res.status(200).json({ message: "Career updated successfully", career });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
export const deleteCareer = async (req, res) => {
  try {
    const career = await deleteCareerService(req.params.id);
    if (!career) return res.status(404).json({ message: "Career not found" });
    res.status(200).json({ message: "Career deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
