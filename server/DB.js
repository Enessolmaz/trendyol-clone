import mongoose from "mongoose";


export const DB_MONGOOSE = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => console.log("OK"))
  } catch (error) {
    console.error(error)
  }
}