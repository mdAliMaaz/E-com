import express from 'express';
import { processPayment } from '../controller/paymentController.js';

const router = express.Router();



router.route('/api/payment').post(processPayment);



export default router;