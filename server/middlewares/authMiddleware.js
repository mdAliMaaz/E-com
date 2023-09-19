import JWT from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';


const protect = asyncHandler(async (req, res, next) => {
    const { token } = req.cookies;

    if (token) {

        try {

            const data = JWT.verify(token, process.env.SECRET_KEY)

            const user = await User.findById(data.id).select('-password');

            req.user = user;

            next();

        } catch (error) {

            res.status(401)
            throw new Error("Token not valid login again")
        }
    }
    else {
        res.status(401)
        throw new Error("Not authorized , No token found")
    }
})

const isAdmin = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403)
            throw new Error("you are not Admin NOT authorized")
        }
        next();
    }
}

export { protect, isAdmin }