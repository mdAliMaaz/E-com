import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productSlice';
import productDetailsReducer from '../features/productDetailsSlice';
import authReducer from '../features/authSlice'
import userReducer from '../features/userSlice'

const store = configureStore({
    reducer: {
        products: productReducer,
        productDetails: productDetailsReducer,
        auth: authReducer,
        user: userReducer
    }
})

export default store