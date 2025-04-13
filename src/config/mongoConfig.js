import mongoose from "mongoose";

const connectMongoDB = () => {
  return mongoose.connect(process.env.MONGO_URL);
};

export default connectMongoDB;
