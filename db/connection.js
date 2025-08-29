import mongoose from "mongoose";

export const connectingToDb = async (dbString) => {
  try {
    await mongoose.connect(dbString);
    console.log("connected to database..");
  } catch (error) {
    console.log("error occured while connecting to db");
  }
};
