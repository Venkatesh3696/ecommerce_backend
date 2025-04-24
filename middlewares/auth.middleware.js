import Jwt from "jsonwebtoken";

export const checkUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token found !",
    });
  }

  try {
    const decoded = Jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log("decoded", decoded);
    next();
  } catch (error) {
    console.log("error in check user middleware", error);
    if (error.name === "TokenExpiredError") {
      res.clearCookie("token");
      return res.status(401).json({
        success: false,
        message: "Token expired! Logged out.",
      });
    }
    res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};

export const userRoles = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message:
          "Forbidden! You do not have permission to access this resource.",
      });
    }
    next();
  };
};
