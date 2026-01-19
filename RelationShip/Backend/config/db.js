import mongoose from "mongoose";
import dotenv  from "dotenv"
dotenv.config();
 async function dataBase(){
await mongoose.connect(process.env.DB_URL)
console.log("database connected");

}

export default dataBase;