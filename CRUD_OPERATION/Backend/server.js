import express from "express"
import dotenv from "dotenv"
import main from "./config/db.js";
import EmpRouter from "./routes/Employee.route.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/test", (req,res)=>{
    res.json({message:"testing"})
});
app.use("/api", EmpRouter)
main();
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`app listening ${port}`);
});