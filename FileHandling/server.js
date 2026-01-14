import dotenv from "dotenv"
dotenv.config();
import express from "express"
import mongoose from "mongoose"
import FileRoute from "./routes/fileRoutes.js";
const app = express();
const dataBase = async()=>{
    await mongoose.connect(process.env.DBURL);
    console.log("DATABASE CONNECT");
};
dataBase();

app.use(express.json());
app.use(express.urlencoded());

app.get("/test", (req,res)=>{
    res.json({message:"here is working"});
});

app.use("/file", FileRoute);
const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log("app listening on port 5000");
})
