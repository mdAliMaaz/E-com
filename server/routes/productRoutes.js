import express from 'express'
import { addNewProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controller/productController.js';


const router = express.Router();


router.route('/api/products').get(getAllProducts).post(addNewProduct)
router.route('/api/products/:id').get(getProductById).put(updateProduct).delete(deleteProduct)


export default router;