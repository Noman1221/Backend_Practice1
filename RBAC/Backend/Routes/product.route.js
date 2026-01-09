import express from "express";
import isAuthenticate from "../Middleware/isAuthenticate.js";
import { authorized } from "../Middleware/authorize.js";
import { create, deleteProduct, read, update } from "../Controllers/Product.controller.js";

const productRouter = express.Router();

productRouter.post("/create", isAuthenticate, authorized("create"), create);
productRouter.get("/read", isAuthenticate, authorized("read"), read);
productRouter.put("/update", isAuthenticate, authorized("update"), update);
productRouter.delete("/delete", isAuthenticate, authorized("delete"), deleteProduct);

export default productRouter;
