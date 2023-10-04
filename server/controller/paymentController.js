import Stripe from 'stripe';
import asyncHandler from 'express-async-handler';


const stripe = new Stripe("sk_test_51NwolvSGWoYo4XbtS6ovqHdSma2mbG3l0sgBpI1TeUfg4pwgmvTuLeA9EpDtNASfOQ0A14VTlWCqXvxScpiKmbbh006Tr1jaOh")

export const processPayment = asyncHandler(async (req, res, next) => {


    const FRONT_END_DOMAIN = 'http://localhost:5173';


    const line_items = req.body.map((product) => ({
        price_data: {
            currency: 'inr',
            product_data: {
                name: product.name,
            },
            unit_amount: product.price * 100
        },
        quantity: product.quantity
    }))


    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: 'payment',
        success_url: `${FRONT_END_DOMAIN}/payment/success`,
        cancel_url: `${FRONT_END_DOMAIN}/payment/cancel`,
    })


    res.json({ id: session.id })
})