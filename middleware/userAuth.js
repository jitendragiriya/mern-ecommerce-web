const ErrorHandler = require('../utils/errorhander')
const catchAsyncErrors = require('./catchAsyncErrors')

const jwt = require('jsonwebtoken')
const User = require('../models/User')

// user is logged in or not

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    
    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decodedData.id);

    next();
});

// defined roles for the user and admin 
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Role: ${req.user.role} is not allowed to access this resouce `,
                    403
                )
            );
        }
        next();
    };
};
