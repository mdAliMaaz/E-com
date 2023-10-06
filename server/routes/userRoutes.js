import express from 'express';

import { registerUser, getAllUsers, getUserById, updateUser, deleteUser, login, forgotPassword, resetPassword, getUserInfo, logout, changePassword, updateProfile, updateUserRole } from '../controller/userController.js';

import { isAdmin, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/api/users').post(registerUser)

router.route('/api/users/login').post(login);


// me Routes
router.route('/api/me').get(protect, getUserInfo);

router.route('/api/me/update').put(protect, updateProfile);

router.route('/api/users/logout').post(logout);

router.route('/api/users/password/change').post(protect, changePassword);

router.route('/api/users/password/forgot').post(forgotPassword);

router.route('/api/users/password/reset/:token').put(resetPassword);

// admin
router.route("/api/admin/users").get(protect, isAdmin("admin"), getAllUsers)
router.route("/api/admin/users/role/:id").post(protect, isAdmin("admin"), updateUserRole)
router.route("/api/admin/users/:id").get(protect, isAdmin("admin"), getUserById)
router.route("/api/admin/users/:id").put(protect, isAdmin("admin"), updateUser)
router.route("/api/admin/users/:id").delete(protect, isAdmin("admin"), deleteUser)


export default router;