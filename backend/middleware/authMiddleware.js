import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async  (req,resp,next) => {
    try {
        let token;

        if (req.headers.authorization?.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return resp.status(401).json({ 
            success: false,
            message: "Authorization token missing"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
    
        if (!user) {
          return resp.status(401).json({
            success: false,
            message: "Invalid token: user not found"
          });
        }
        req.user = user;
        return next();
  
    } catch (error) {
        return resp.status(401).json({
            success: false,
            message: "Invalid or expired token",
            error: error.message
          });
    }
}

export default authMiddleware;
