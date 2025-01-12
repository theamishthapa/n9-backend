import { WebUser } from "../schema/webUserSchema.js";

export const isAuthorized = (roles) => {
  return async (req, res, next) => {
    try {
      let _id = req._id;
      let result = await WebUser.findById(_id);
      let tokenRole = result.role;

      if (roles.includes(tokenRole)) {
        next();
      }
      res.status(400).json({
        success: false,
        message: "USER NOT AUTHORIZED",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "USER NOT AUTHORIZED",
      });
    }
  };
};
