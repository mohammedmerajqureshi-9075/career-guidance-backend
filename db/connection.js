import mongoose from "mongoose";

export const connectingToDb = async (dbString) => {
  try {
    await mongoose.connect(dbString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ connected to database..");
  } catch (error) {
    console.error("❌ error occured while connecting to db:", error.message);
    process.exit(1);
  }
};
