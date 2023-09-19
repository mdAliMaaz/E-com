import express from 'express';
import { registerUser, getAllUsers, getUserById, updateUser, deleteUser, login } from '../controller/userController.js'
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/api/users').post(registerUser).get(getAllUsers);

router.route('/api/users/login').post(login);

router.route('/api/users/:id').get(protect, getUserById).put(protect, updateUser).delete(protect, deleteUser);



export default router;