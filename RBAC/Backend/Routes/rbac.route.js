import express from "express"
import isAuthentcate from "../Middleware/isAuthenticate.js"
import { currUser, login, Register } from "../Controllers/rbac.user.js";

const authRoute = express.Router();

authRoute.post("/register", Register);
authRoute.post("/login", login);
authRoute.get("/me", isAuthentcate,currUser);

export default authRoute;