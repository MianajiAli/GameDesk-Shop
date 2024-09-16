import { CustomError } from "../util/custom-errors.util.js";

export const hasAccess = (requiredPermissions = []) => {
  return (req, res, next) => {
    try {
      const user = req.user;
      const isSuperadmin = user.role === "superadmin";
      const isAdminWithPermissions =
        user.role === "admin" &&
        Array.isArray(requiredPermissions) &&
        requiredPermissions.length > 0 &&
        requiredPermissions.every((permission) =>
          user.permissions.includes(permission)
        );
      if (!isSuperadmin && !isAdminWithPermissions) {
        throw new CustomError("شما به این بخش دسترسی ندارید", 403);
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
