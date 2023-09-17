import mongoose from "mongoose";

// const uri = "mongodb://ockode:ockodepassmdp@mongodb:27017";
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";

const initDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri, { dbName: "geek-verse" });
    console.log("Database connected");
  } catch (e) {
    console.log("oh oh problem : ", e.message);
  }
};

export default initDb;
