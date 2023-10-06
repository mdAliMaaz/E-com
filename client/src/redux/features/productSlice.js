import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handleError, handleSuccess } from '../../helper/notification';
import axios from 'axios';



export const getProducts = createAsyncThunk("getProducts", async ({ keyword = "", page = 1, category = "" }) => {


    let url = `http://localhost:5000/api/products?keyword=${keyword}&page=${page}`

    if (category) {
        url = `http://localhost:5000/api/products?keyword=${keyword}&page=${page}&category=${category}`
    }
    const response = await fetch(url, { method: "GET", credentials: "include" });

    return await response.json()
})

export const addProduct = createAsyncThunk('addProduct', async (formData) => {
    try {
        const { data } = await axios.post("http://localhost:5000/api/products", formData, { withCredentials: true });
        if (data.success) {
            handleSuccess(data.message, data.success);
        }
        else {
            handleError(data.message);
        }
    } catch (error) {
        handleError(error)
    }
})

export const deleteProduct = createAsyncThunk('deleteProduct', async (id) => {
    try {
        const { data } = await axios.delete(`http://localhost:5000/api/products/${id}`, { withCredentials: true });
        if (data.success) {
            handleSuccess(data.message, data.success);
        }
        else {
            handleError(data.message);
        }

    } catch (error) {
        handleError(error.message)
    }
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
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(deleteProduct.pending, (state, action) => {
            state.isLoading = true;
        })
    }
})

export default productSclice.reducer
