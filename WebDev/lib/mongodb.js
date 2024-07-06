import mongoose from "mongoose"

let isConnected = false

export const connectMongodb = async () => {
  if (process.env.MONGO_SECRET == null) 
  { 
    throw new Error("Mongo DB secret not found");
  }

  if (isConnected){ 
    console.log('Already connected to MongoDB'); 
    return; 
  }

  console.log(`connecting to mongo db...`)
  try {
    await mongoose.connect(process.env.MONGO_SECRET)
    isConnected = true;
  } catch (error) {
    throw new Error(`Error connecting to mongo db : ${error.message}`);
  }
}