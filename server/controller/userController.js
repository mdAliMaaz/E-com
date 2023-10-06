import asyncHandler from 'express-async-handler';

import crypto from 'crypto';

import cloudinary from 'cloudinary';

import User from '../models/userModel.js';
import { checkPassword } from '../utils/hashPassword.js'
import { generateToken } from '../utils/generateToken.js';
import { sendEmail } from '../utils/sendEmail.js';

import { uploadImage } from '../utils/cloudinary.js';

// @Desc get All Users
// @ Route GET: /api/users
export const getAllUsers = asyncHandler(async (req, res) => {

    const allUsers = await User.find().select('avatar email name role');

    if (!allUsers) {
        res.status(404)
        throw new Error(`No users found`)
    }

    res.status(200).json(allUsers)
})

// @Desc Login User Only "Admin"
// @ Route POST: /api/users/login
export const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const exixtingUser = await User.findOne({ email });

    if (!exixtingUser) {
        res.status(404)
        throw new Error('User not found')
    }

    const correctPassword = checkPassword(password, exixtingUser.password);




    if (!correctPassword) {
        res.status(401)
        throw new Error('Invalid password');
    }

    const options = {
        name: exixtingUser.name,
        id: exixtingUser._id
    }
    generateToken(res, options);

    res.status(200).json({ success: true, message: "User successfully logged in", name: exixtingUser.name, role: exixtingUser.role });
})

// @Desc get User by ID only "Admin"
// @ Route GET: /api/users
export const getUserById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) {
        res.status(404)
        throw new Error(`User not found`)
    }
    res.status(200).json(user)
})
// @Desc Register User
// @ Route POST: /api/users

export const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    const { tempFilePath } = req.files.avatar;

    const { url, public_id } = await uploadImage(tempFilePath);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already taken" })
    }
    const newUser = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: public_id || "sample_imageId",
            url: url || "sample_image_url"
        }
    });


    if (!newUser) {
        res.status(400)
        throw new Error('Invalid Information')
    }
    res.status(201).json({ success: true, message: "new User created successfully", newUser })

})


// @Desc Update User
// @ Route PUT: /api/admin/users/:id
export const updateUser = asyncHandler(async (req, res) => {


    const id = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedUser) {
        res.status(400)
        throw new Error('Something went wrong')
    }

    res.status(200).json({ success: true, message: "User role updated", role: updatedUser.role })


})
// @Desc delete User
// @ Route DELETE: /api/admin/users/:id
export const deleteUser = asyncHandler(async (req, res) => {

    const id = req.params.id;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
        res.status(400)
        throw new Error('Something went wrong')
    }
    res.status(200).json({ success: true, message: "User deleted successfully", name: deletedUser.name })
})

// @Desc Forgot Password
// @ Route DELETE: /api/users/password/forgot
export const forgotPassword = asyncHandler(async (req, res) => {

    const email = req.body.email;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404)
        throw new Error(`User not found`)
    }

    //   get reset password token
    const resetPasswordToken = user.getRestPasswordToken()

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/${resetPasswordToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n,if you have not requested this email then plese igonre it`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Ecom Password recovery",
            message
        });

        res.status(200).json({ success: true, message: `Email sent to ${user.email}` })

    } catch (error) {

        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        user.save({ validateBeforeSave: false });

        throw new Error(error);
    }
})

// @Desc Reset Password
// @ Route PUT: /api/users/password/reset
export const resetPassword = asyncHandler(async (req, res) => {

    const token = req.params.token

    // creating token hashed
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");


    const user = await User.findOne({ resetPasswordToken: hashedToken, resetPasswordTokenExpire: { $gt: Date.now() } });

    if (!user) {
        res.status(401)
        throw new Error(`reset password token is invalid or expired`)
    }

    if (req.body.password !== req.body.conformPassword) {
        throw new Error('password and conform password should be  same');
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save();
    res.status(200).json({ success: true, message: 'Password updated successfully' });
})

// @Desc Get user information
// @ Route Get: /api/users/me
export const getUserInfo = asyncHandler(async (req, res) => {


    const user = await User.findById(req.user.id).select('-password')

    res.status(200).json({ success: true, user })
})

// @Desc Logout User
// @ Route Post: /api/users/logout
export const logout = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
    })
    res.status(200).json({ success: true, message: "User logged out successfully" })
})


// @Desc Change user password
// @ Route Post: /api/users/password/change
export const changePassword = asyncHandler(async (req, res) => {


    const user = await User.findById(req.user.id)

    const { newPassword, oldPassword, conformPassword } = req.body;

    const isPasswordCorrect = checkPassword(oldPassword, user.password);

    if (!isPasswordCorrect) {
        res.status(403)
        throw new Error("Password does not match");
    }

    if (newPassword !== conformPassword) {
        res.status(401)
        throw new Error("New Password and Conform Password must be same");
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({ success: true, message: "Password updated successfully" })
})


// @Desc Update User
// @ Route PUT: /api/me/update
export const updateProfile = asyncHandler(async (req, res) => {

    const updatedData = {
        name: req.body.name,
        email: req.body.email
    }

    if (req.files.avatar) {
        const user = await User.findById(req.user.id);

        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const { tempFilePath } = req.files.avatar;

        const { url, public_id } = await uploadImage(tempFilePath)

        updatedData.avatar = {
            url,
            public_id
        }
    }
    const updatedProfile = await User.findByIdAndUpdate(req.user.id, updatedData, { new: true });


    res.status(200).json({ success: true, message: "Profile updated successfully", updatedProfile })

})

export const updateUserRole = asyncHandler(async (req, res) => {

    const id = req.params.id;

    const user = await User.findById(id);

    if (user.role === "admin") {
        user.role = "user";
    }
    else {
        user.role = "admin"
    }

    await user.save();
    res.status(200).json({ success: true, message: "User role updated successfully" })
})