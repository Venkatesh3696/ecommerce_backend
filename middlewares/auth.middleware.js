import Jwt from "jsonwebtoken";

export const checkUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token found user!",
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
