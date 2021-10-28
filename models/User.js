const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLenght: [30, "Name cannot exceed 30 lcharacters"],
        minLength: [4, "Name should have more than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, 'please enter a valid email!']

    },
    password:
    {
        type: String,
        required: [true, "Please Enter your Password!"],
        minLength: [8, "Password should have more than 8 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    cart: [{
        id: {
            type: String,
            required: true
        },
        items: {
            title: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            image_url: {
                type: String,
                required: true
            },
            total_quantity: {
                type: Number,
                default: 0,
                required: true
            },

            total_price: {
                type: Number,
                default: 0,
                required: true
            },
            items: [{
                name: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                q: {
                    type: Number,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }]

        },
    }],
    date: {
        type: Date,
        default: Date.now
    },
});


// hashing password before storing in the database 
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// generate authToken 

UserSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 })

}


//comparePassword 
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


//Generating password reset Token
UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    // hashing and adding the resetPasswordToken to the userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // reset Password token expire time is this
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}
const User = mongoose.model('user', UserSchema);
module.exports = User;
