import express from "express"
import dotenv from "dotenv"
dotenv.config();
import dataBase from "./config/db.js";
dataBase()
const app =  express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/test", (req,res)=>[
    res.json({message:"api is working"})
]);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
});