import express from "express"
import isAuthenticate from "../middleware/authMiddleware.js"
import { currentUser, login, register } from "../controller/auth.controller.js";

const authRoute = express.Router();

authRoute.post("/signin", register)
authRoute.post("/login", login)
authRoute.post("/me", currentUser)

export default authRoute;
