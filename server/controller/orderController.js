import asyncHandler from 'express-async-handler';

import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'


// @ Desc add new Order
// @ POST /api/orders
export const newOrder = asyncHandler(async (req, res) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;


    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user.id,
    });

    res.status(201).json({
        success: true,
        order,
    });

})


// @ Desc get All orders
// @ GET /api/order/:id
export const getSingleOrder = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        res.status(404)
        throw new Error("Order not found")
    }
    res.status(200).json(order)
})

// @ Desc get all orders of logged in user
// @ GET /api/orders/me
export const myOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({ user: req.user.id })

    if (!orders) {
        res.status(404)
        throw new Error("Order not found")
    }

    res.status(200).json(orders)
})


// @ Desc get all orders -- Admin only
// @ GET /api/orders/me
export const allOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find();

    if (!orders) {
        res.status(404)
        throw new Error("Order not found")
    }
    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice
    })
    res.status(200).json({ totalAmount, orders })
})

// @ Desc Update order -- Admin only
// @ PUT /api/orders/update
export const updateOrder = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404)
        throw new Error(`Order not found`)
    }

    if (order.orderStatus === "Delivered") {
        res.status(400)
        throw new Error("You have already delivered this order")
    }

    order.orderItems.forEach(async (order) => {

        await updateStock(order.product, order.quantity)

    })

    order.orderStatus = req.body.status;


    if (order.orderStatus === "Devivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false })

    res.status(200).json({ success: true, message: "Order delivered" })
})

// update stock
async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save({ validateBeforeSave: false })
}

// // @ Desc Delete order -- Admin only
// @ PUT /api/orders/delete
export const deleteOrder = asyncHandler(async (req, res) => {



    const order = await Order.findByIdAndDelete(req.params.id)

    if (!order) {
        res.status(404)
        throw new Error(`Order not found`)
    }

    res.status(200).json({ success: true })
})