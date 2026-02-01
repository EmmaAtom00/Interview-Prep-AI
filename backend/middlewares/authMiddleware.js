import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1]; //Extract token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password"); //Attach user to req object excluding password
      next();
    } else {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } catch (error) {
    res
      .status(401)
      .json({ message: "Not authorized, token failed", error: error.message });
  }
};
