import { allOrders, deleteOrder, getSingleOrder, myOrders, newOrder, updateOrder } from '../controller/orderController.js'
import { isAdmin, protect } from '../middlewares/authMiddleware.js';

import express from 'express';

const router = express.Router();


router.route('/api/orders').post(protect, newOrder);

router.route('/api/order/:id').get(protect, getSingleOrder)

router.route('/api/orders/me').get(protect, myOrders)

router.route('/api/admin/orders').get(protect, isAdmin("admin"), allOrders)

router.route("/api/admin/orders/:id").put(protect, isAdmin("admin"), updateOrder).delete(protect, isAdmin("admin"), deleteOrder)




export default router;