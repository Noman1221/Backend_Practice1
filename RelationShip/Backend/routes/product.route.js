import express from "express"
import isAuthenticate from "../middleware/authMiddleware.js";
import { CreateProduct, getProducts } from "../controller/product.controller.js";
const productRout = express.Router();

productRout.post("/create", isAuthenticate, CreateProduct)
productRout.get("/getproduct", isAuthenticate, getProducts);
export default productRout;