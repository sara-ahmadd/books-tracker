import mongoose from "mongoose";

const mongoDB_uri = process.env.NEXT_PUBLIC_MONGODB_URI;
export const connectDB = async () => {
  try {
    if (!mongoDB_uri) throw new Error("Mongodb Uri is missing...");
    if (mongoDB_uri) {
      await mongoose
        .connect(mongoDB_uri)
        .then(() => console.log("Connecting to DB.."));
    }
  } catch (error) {
    throw new Error(`Error in connection with the DB ==> ${error}`);
  }
};
