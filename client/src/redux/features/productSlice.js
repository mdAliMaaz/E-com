import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getProducts = createAsyncThunk("getProducts", async ({ keyword = "", page = 1, category = "" }) => {


    let url = `http://localhost:5000/api/products?keyword=${keyword}&page=${page}`

    if (category) {
        url = `http://localhost:5000/api/products?keyword=${keyword}&page=${page}&category=${category}`
    }
    const response = await fetch(url);

    console.log(url)
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
