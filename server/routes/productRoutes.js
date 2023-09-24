import express from 'express'
import { addNewProduct, addRewiewAndUpdate, deleteProduct, deleteReview, getAllProducts, getProductById, getReviewsByProduct, updateProduct } from '../controller/productController.js';
import { protect, isAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router();


router.route('/api/products').get(protect, getAllProducts).post(protect, protect, isAdmin("admin"), addNewProduct);

router.route('/api/products/:id').get(protect, getProductById).put(protect, isAdmin("admin"), updateProduct).delete(protect, isAdmin("admin"), deleteProduct);

router.route("/api/review").put(protect, addRewiewAndUpdate);

router.route("/api/reviews").get(getReviewsByProduct).delete(deleteReview);

export default router;