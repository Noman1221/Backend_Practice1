import RBACUSER from "../Models/RBAC.model.js";
import jwt from "jsonwebtoken";

const isAuthenticate = async (req, res, next) => {
  try {
    const authHead = req.headers.authorization;

    if (!authHead?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const token = authHead.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await RBACUSER.findById(decoded._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

export default isAuthenticate;
