import jwt from "jsonwebtoken";
import user from "../models/user.model";
import { ENV_VARS } from "../config/envVars.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookie["Netflix-cookie"];
    if (!token) {
      res.status(404).json({ success: false, message: "error-unauthorised" });
    }
    const decoded = jwt.verify(token, env_VAR.JWT_SECRET);

    if (!decoded) {
      res.status(404).json({ success: false, message: "error -invalid token" });
    }

    const user = await user.findById(decoded.userid).select("-password");
    if (!user) {
      res.status(404).json({ success: false, message: "user not found " });
    }
    req.user = user;
  } catch (error) {
    console.log("error in protected route middleware ", err.message);
    res
      .status(500)
      .json({ success: false, message: "internal error was found" });
  }
};
