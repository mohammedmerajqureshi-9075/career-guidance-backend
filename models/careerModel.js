import mongoose from "mongoose";

const careerSchema = new mongoose.Schema({
  Technology: { type: String, required: true },
  AverageSalary: { type: Number, required: true },
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
  Popularity: { type: String, required: true },
  JobGrowth: { type: String, enum: ["high", "low"], required: true },
  WorkLifeBalance: { type: String, enum: ["good", "bad"], required: true },
  EducationRequired: { type: String, required: true },
  Duration: { type: String, required: true },
  KeyRequirements: { type: [String], required: true },
  RelatedCareers: { type: [String], required: true },
  SkillsTechnologies: { type: [String], required: true },
  TopCompanies: { type: [String], required: true },
  role: { 
    type: String, 
    enum: ["After10", "After12Arts", "After12Science", "After12Commerce"], 
    required: true 
  },
}, { timestamps: true });

const Career = mongoose.model("Career", careerSchema);
export default Career;
