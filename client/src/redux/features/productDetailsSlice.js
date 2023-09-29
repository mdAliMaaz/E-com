import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const getProductDetails = createAsyncThunk("getProductDetails", async (id) => {
    const response = await fetch(`http://localhost:5000/api/products/${id}`, { method: "GET", credentials: "include" })
    return await response.json()
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