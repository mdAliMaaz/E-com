import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import { checkPassword } from '../utils/hashPassword.js'
import { generateToken } from '../utils/generateToken.js';
import { sendEmail } from '../utils/sendEmail.js';
import crypto from 'crypto';
// @Desc get All Users
// @ Route GET: /api/users
export const getAllUsers = asyncHandler(async (req, res) => {

    const allUsers = await User.find();

    if (!allUsers) {
        res.status(404)
        throw new Error(`No users found`)
    }

    res.status(200).json(allUsers)
})

// @Desc Login User
// @ Route POST: /api/users/login
export const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const exixtingUser = await User.findOne({ email });

    if (!exixtingUser) {
        res.status(404)
        throw new Error('User not found')
    }

    const correctPassword = checkPassword(password, exixtingUser.password);


    console.log(correctPassword)


    if (!correctPassword) {
        res.status(401)
        throw new Error('Invalid password');
    }

    const options = {
        name: exixtingUser.name,
        id: exixtingUser._id
    }
    generateToken(res, options);

    res.status(200).json({ success: true, message: "User successfully logged in", name: exixtingUser.name });
})

// @Desc get User by ID
// @ Route GET: /api/users
export const getUserById = asyncHandler(async (req, res) => {
    console.log(req.user)
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


    const newUser = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "sample Public id",
            url: "http://example.com"
        }
    })


    if (!newUser) {
        res.status(400)
        throw new Error('Invalid Information')
    }
    res.status(201).json({ success: true, message: "new User created successfully", newUser })

})


// @Desc Update User
// @ Route PUT: /api/users
export const updateUser = asyncHandler(async (req, res) => {


    const id = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedUser) {
        res.status(400)
        throw new Error('Something went wrong')
    }

    res.status(200).json({ success: true, message: "User updated successfully", updatedUser })


})
// @Desc delete User
// @ Route DELETE: /api/users
export const deleteUser = asyncHandler(async (req, res) => {

    const id = req.params.id;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
        res.status(400)
        throw new Error('Something went wrong')
    }
    res.status(200).json({ success: true, message: "User deleted successfully", deletedUser })
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


    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/password/reset/${resetPasswordToken}`

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
// @ Route DELETE: /api/users/password/reset
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