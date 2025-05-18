import jwt from "jsonwebtoken";

const secretKey = "your_jwt_secret_key";

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ message: "Access Denied" });
    }
  
    try {
      const verified = jwt.verify(token, "your_jwt_secret_key");
      req.user = verified; // Attach the user to the request
      next();
    } catch (err) {
      res.status(403).json({ message: "Invalid Token" });
    }
  };

 export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access Denied: Insufficient Permissions" });
      }
      next();
    };
  };
