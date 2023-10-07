import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleError, handleSuccess } from '../../helper/notification';
import axios from 'axios';


export const getAllOrders = createAsyncThunk('getAllOrders', async () => {
    try {
        const { data } = await axios.get("http://localhost:5000/api/admin/orders", { withCredentials: true })
        return data
    } catch (error) {
        handleError(error.message)
    }
})

export const getSingleOrder = createAsyncThunk('getSingleOrder', async (id) => {

    try {
        const { data } = await axios.get(`http://localhost:5000/api/order/${id}`, { withCredentials: true });
        return data

    } catch (error) {
        handleError(error.message)
    }
})


export const updateOrder = createAsyncThunk('updateOrder', async (id) => {
    try {
        const { data } = await axios.put(`http://localhost:5000/api/admin/orders/${id}`, { status: "Delivered" }, { withCredentials: true })
        if (data.success) {
            handleSuccess(data.success, data.message)
        }
        else {
            handleError(data.message)
        }
    } catch (error) {
        handleError(error.message)
    }
})


const initialState = {
    isLoading: false,
    isError: false,
    orders: {
        totalAmount: 0,
        orders: {}
    },
    orderDetails: {}
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllOrders.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getAllOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload;
        }).addCase(getAllOrders.rejected, (state, action) => {
            state.isError = true;
        }).addCase(getSingleOrder.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getSingleOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderDetails = action.payload;
        }).addCase(getSingleOrder.rejected, (state, action) => {
            state.isError = true;
        })
    }

})

export default orderSlice.reducer;