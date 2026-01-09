import mongoose  from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const url = process.env.DB_URL;
console.log(process.env.DB_URL);


async function Database() {
  try {
      await mongoose.connect(url);
      console.log("database conneced");
  } catch (error) {
    console.log(error);
    
  }
    
}

  export default Database