import express from 'express';
import { registerUser, getAllUsers, getUserById, updateUser, deleteUser, login, forgotPassword, resetPassword } from '../controller/userController.js'
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/api/users').post(registerUser).get(getAllUsers);

router.route('/api/users/login').post(login);

router.route('/api/users/:id').get(protect, getUserById).put(protect, updateUser).delete(protect, deleteUser);

router.route('/api/users/password/forgot').post(forgotPassword);
router.route('/api/users/password/reset/:token').put(resetPassword);


export default router;