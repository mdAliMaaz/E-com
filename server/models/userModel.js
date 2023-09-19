import mongoose from "mongoose";
import validator from 'validator';
import { hashPassword } from "../utils/hashPassword.js";

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

export default mongoose.model('User', userSchema);