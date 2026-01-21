import express from "express"
import dotenv from "dotenv"
dotenv.config();
import dataBase from "./config/db.js";
import authRoute from "./routes/auth.route.js";
import productRout from "./routes/product.route.js";
dataBase()
const app =  express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/test", (req,res)=>[
    res.json({message:"api is working"})
]);

app.use("/auth", authRoute)
app.use("/product", productRout)

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
});