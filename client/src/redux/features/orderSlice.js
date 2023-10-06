import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleError } from '../../helper/notification';
import axios from 'axios';


export const getAllOrders = createAsyncThunk('getAllOrders', async () => {
    try {
        const { data } = await axios.get("http://localhost:5000/api/admin/orders", { withCredentials: true })
        return data
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
    singleOrder: {}
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
        });
    }

})

export default orderSlice.reducer;