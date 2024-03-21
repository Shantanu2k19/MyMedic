import mongoose from "mongoose"

let isConnected = false

export const connectMongodb = async () => {
  if (process.env.MONGO_SECRET == null) { console.log('MONGO_SECRET not found'); return }

  if (isConnected) { console.log('Already connected to MongoDB') }

  console.log(`connecting to mongo db...`)
  try {
    await mongoose.connect(process.env.MONGO_SECRET)
    isConnected = true
    console.log('connected to mongo db')
  } catch (error) {
    console.log(`Error connecting to mongo db ${error.message}`)
  }
}