const crypto = require('crypto')
// models
const User = require('../../models/User')

//middleware 

const ErrorHandler = require('../../utils/errorhander')
const catchAsyncErrors = require('../../middleware/catchAsyncErrors')
const cloudinary = require('cloudinary').v2

//utils

const sendToken = require('../../utils/JwtToken')
const sendEmail = require('../../utils/sendEmail')

//  1. USER REGISTER CONTROLLER 

exports.register = (catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    let user = await User.findOne({ email })

    if (user) {
        return next(new ErrorHandler('This username is already exist!', 401))
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler("password does not match, please try again!"))
    }
    const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });

    user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });

    sendToken(user, 200, res);
}
))

// 2. USER LOGIN CONTROLLER 

exports.login = (catchAsyncErrors(async (req, res, next) => {
    // let success = false;
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please Enter email and password!'))
    }

    let user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler('Invalid email or password!', 401));
    }

    const passwordCompare = await user.comparePassword(password);

    if (!passwordCompare) {
        return next(new ErrorHandler('Invalid email or password!', 401));
    }
    sendToken(user, 200, res);
}
))

// 3. USER LOGOUT CONTROLLER
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'logout successfully',
    })
})

// 4. USER FORGOT PASSWORD CONTROLLER

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler('User not found!', 404));
    }

    // Get ResetPassword Token 
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/password/reset/${resetToken}`
    const message = `Your password reset link is :- \n\n${resetPasswordUrl}\n\n If you have not requested this email than, please ignore it`;

    try {
        await sendEmail({
            email: user.email,
            subject: `MyShop Password Recovery`,
            message,
        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        })

    } catch (error) {
        user.getResetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        console.log(error)

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error, message, 500));
    }
})

// 5. RESET PASSWORD CONTROLLER
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    // hashing and adding the resetPasswordToken to the userSchema
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHandler('Reset Password token is invalid or has been expired!', 404));
    }

    if (req.body.password != req.body.confirmPassword) {
        return next(new ErrorHandler('password does not match!', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);
})

// 6. GET USER DETAILS CONTROLLER
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    });
})

// 7. UPDATE USER PASSWORD CONTROLLER
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id).select('+password');

    const passwordCompare = await user.comparePassword(req.body.oldPassword);

    if (!passwordCompare) {
        return next(new ErrorHandler('Old Password is not correct!', 401));
    }
    if (req.body.newPassword != req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match!', 401));
    }

    user.password = req.body.newPassword

    await user.save();

    sendToken(user, 200, res);
})

// 8. UPDATE USER PROFILE CONTROLLER
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);

        const imageId = user.avatar.public_id;

        await cloudinary.uploader.destroy(imageId);

        const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    if (!user) {
        return next(new ErrorHandler('image should be less then 200kb',400))
    }
    res.status(200).json({
        success: true,
    });
})

//================ADMIN CONTROLLER======================//
// 1. GET ALL USERS

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find({});

    res.status(200).json({
        success: true,
        users
    });
})
// 2. GET SINGLE USER

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not exist with id :${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        user
    });
})

// 3. UPDATE USER ROLE CONTROLLER
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        role: req.body.role
    }

    if (req.params.id === req.user.id) {
        return next(new ErrorHandler('you can not change you role!', 400))
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    }
    )
    res.status(200).json({
        success: true,
        message: "User Role Updated Successfully!"
    });
})

// 4. DELETE A USER CONTROLLER
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id,)
    if (!user) {
        return next(new ErrorHandler(`user does not exist with this id : ${req.params.id}`));
    }

    if (req.params.id === req.user.id) {
        return next(new ErrorHandler('You cannot delete yourself!', 400))
    }

    const imageId = user.avatar.public_id;

    await cloudinary.uploader.destroy(imageId);

    await user.remove();
    res.status(200).json({
        success: true,
        message: "User Deleted Successfully!"
    });
})
