import mongoose from "mongoose";
import validator from 'validator';
import { hashPassword } from "../utils/hashPassword.js";
import crypto from 'crypto';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        minLength: 3
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: [validator.isEmail, "Please enter valid email"]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 6,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,

    resetPasswordTokenExpire: Date,
})

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        next();
    }
    this.password = hashPassword(this.password);
})


// generating reset password  token
userSchema.methods.getRestPasswordToken = function () {

    // Generating reset password token
    const token = crypto.randomBytes(20).toString("hex");

    // Hashing and adding  reset password token
    const tokenCrypto = crypto.createHash("sha256").update(token).digest("hex");

    // setting reset password token in user schema
    this.resetPasswordToken = tokenCrypto;

    this.resetPasswordTokenExpire = Date.now() + 15 * 60 * 1000;

    return token;

}

export default mongoose.model('User', userSchema);