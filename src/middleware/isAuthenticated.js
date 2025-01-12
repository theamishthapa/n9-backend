import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    // get token from postman
    let tokenString = req.headers.authorization;
    let tokenArray = tokenString.split(" ");
    let token = tokenArray[1];

    // verify token
    let user = await jwt.verify(token, process.env.SECRET_KEY);
    req._id = user._id;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "user not authorized to read profile",
    });
  }
};
