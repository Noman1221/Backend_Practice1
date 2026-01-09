import dotenv from "dotenv"
dotenv.config()
import express from "express"
import Database from "./config/db.js"
import authRoute from "./Routes/rbac.route.js"
import productRouter from "./Routes/product.route.js"

const app = express()

app.use(express.json());

app.get("/test", (req,res)=>{
    res.json({message:"test"})
});
app.use("/auth", authRoute);
app.use("/product", productRouter)


Database()
const port = process.env.PORT|| 5000;
app.listen(port, ()=>{
    console.log(`app listening on port ${port}`);
});