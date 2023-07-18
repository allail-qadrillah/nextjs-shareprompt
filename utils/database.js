import mongoose from "mongoose";

let isConnected = false // track connection
export const connectToDB = async () => {
  mongoose.set('strictQuery', true)

  if(isConnected) {
    console.log('MonggoDB already Connected')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "Promptopia",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true
    console.log('MonggoDB Connected')

  } catch (error) {
    console.log(error)
  }
}
