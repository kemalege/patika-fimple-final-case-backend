import jwt from "jsonwebtoken";
import asyncErrorWrapper from "express-async-handler";
import User from "../../models/User.js";
import { getAccessTokenFromHeader, isTokenIncluded } from "../../utils/database/auth/tokenFunctions.js";
import CustomError from "../../utils/error/CustomError.js";

const getAccessToRoute = (req, res, next) => {
    const { JWT_SECRET_KEY } = process.env;

    if (!isTokenIncluded(req)) {
        return next(
            new CustomError("You are not authorized to access this route", 401)
        );
    }
    const accessToken = getAccessTokenFromHeader(req);

    jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(
                new CustomError("You are not authorized to access this route", 401)
            );
        }
        req.user = {
            id: decoded.id,
            name: decoded.name,
        };
        
        next();
    });
};

const getAdminAcess = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.user;

    const user = await User.findById(id);

    if (user.role !== "admin") {
        return next(new CustomError("Only admins can access this route", 403));
    }
    next();
});

export { getAccessToRoute, getAdminAcess }

