import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getProducts = createAsyncThunk("getProducts", async () => {
    const response = await fetch("http://localhost:5000/api/products")
    return response.json()
})

const productSclice = createSlice({
    name: "Product",
    initialState: {
        isLoading: false,
        isError: false,
        data: {}
    },
    extraReducers: (builder) => {

        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(getProducts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state.isError = true;
        });
    }
})

export default productSclice.reducer
