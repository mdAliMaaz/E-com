import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productSlice';
import productDetailsReducer from '../features/productDetailsSlice';
import authReducer from '../features/authSlice'
import userReducer from '../features/userSlice'
import cartReducer from '../features/cartSlice'
import adminReducer from '../features/adminSlice'
import orderReducer from '../features/orderSlice'




const store = configureStore({
    reducer: {
        products: productReducer,
        productDetails: productDetailsReducer,
        auth: authReducer,
        user: userReducer,
        cart: cartReducer,
        admin: adminReducer,
        order: orderReducer
    }
})

export default store