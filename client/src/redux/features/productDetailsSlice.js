import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { handleError, handleSuccess } from '../../helper/notification';

export const getProductDetails = createAsyncThunk("getProductDetails", async (id) => {
    const response = await fetch(`http://localhost:5000/api/products/${id}`, { method: "GET", credentials: "include" })
    return await response.json()
})


export const submitReview = createAsyncThunk('submitReview', async (review) => {
    try {
        const { data } = await axios.put("http://localhost:5000/api/review", review, { withCredentials: true })
        if (data.success) {
            handleSuccess("Thanks for your feedback", data.success)
        }
    } catch (error) {
        handleError(error.message)
    }
})



const initialState = {
    isLoading: false,
    isError: false,
    data: {}
}


const productDetailsSlice = createSlice({

    name: 'productDetails',

    initialState,

    extraReducers: (builder) => {
        builder.addCase(getProductDetails.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getProductDetails.rejected, (state, action) => {
            state.isError = true
        });
        builder.addCase(getProductDetails.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload;
        });
    }
})

export default productDetailsSlice.reducer;