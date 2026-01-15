import dotenv from "dotenv"
dotenv.config();
import express from "express"
import mongoose from "mongoose"
import FileRouter from "./routes/fileHandle.route.js";

const app = express()
const databaseConnect = async()=>{
    await mongoose.connect(process.env.DBURL);
console.log("database connect");
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/test", (req,res)=>{
    res.json({message:"api working"})
});

app.use("/file", FileRouter)
databaseConnect()
const port  = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`app listening on port ${port}`);
});
