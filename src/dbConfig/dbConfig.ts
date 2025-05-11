import mongoose from "mongoose";

export async function connect(){
  try {
    mongoose.connect(process.env.MONGO_URL!)
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log("mongo Db connection successfull")
    });

    connection.on('error', (error) => {
      console.log("Error in connecting with MongoDB, please make sure your mongoDB is running" + error)
    });

    process.exit();

  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
  }
}