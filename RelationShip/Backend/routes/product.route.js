import express from "express"
import isAuthenticate from "../middleware/authMiddleware.js";
import { CreateProduct } from "../controller/product.controller.js";
const productRout = express.Router();

productRout.post("/create", isAuthenticate, CreateProduct)

export default productRout;