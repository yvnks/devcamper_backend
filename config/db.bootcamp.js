import mongoose from "mongoose";

const connectDB = async () => {
  const connect = await mongoose.connect(process.env.MONGODB_URI);
  console.log(`Connected to db: ${connect.connection.host}`);
};

export default connectDB;
