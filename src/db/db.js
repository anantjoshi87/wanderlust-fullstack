import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://anantjoshi:Zl9f073GF9jjWiAX@wanderlust-cluster.n4ddyon.mongodb.net/wanderlust",
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

export default connectDB;