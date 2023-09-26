import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productSlice';
import productDetailsReducer from '../features/productDetailsSlice';

const store = configureStore({
    reducer: {
        products: productReducer,
        productDetails: productDetailsReducer
    }
})

export default store