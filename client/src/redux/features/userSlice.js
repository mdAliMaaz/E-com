import { handleError, handleSuccess } from '../../helper/notification'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios';

export const getUserInfo = createAsyncThunk("getUserInfo", async () => {
    try {
        const response = await fetch("http://localhost:5000/api/me", { method: "GET", credentials: "include" })

        const { user } = await response.json();


        return user;
    } catch (error) {

        handleError(error.message);
        return error.message
    }

})

export const updateProfile = createAsyncThunk("updateProfile", async (formData) => {
    try {
        const response = await fetch("http://localhost:5000/api/me/update", { method: "PUT", body: formData, credentials: "include" })
        const data = await response.json()
        if (data.success) {
            handleSuccess(data.message, data.success)
            setTimeout(() => {
                window.location.replace('/profile')
            }, 1000)
        }
        else {
            handleError(data.message)
        }
        return data;

    } catch (error) {
        handleError(error.message);
        return error.message
    }
})


export const changePassword = createAsyncThunk("changePassword", async (formData) => {

    try {
        const response = await fetch("http://localhost:5000/api/users/password/change", { credentials: "include", method: "POST", body: formData })

        const data = await response.json();

        if (data.success) {
            handleSuccess(data.message, data.success)
            setTimeout(() => {
                window.location.replace('/profile')
            }, 1000)
        }
        else {
            handleError(data.message);
        }

        return data;

    } catch (error) {
        handleError(error.message);
    }
})


export const createAnOrder = createAsyncThunk(
    "createOrder", async (formData) => {

        try {

            const { data } = await axios.post("http://localhost:5000/api/orders", formData, { withCredentials: true });
            if (data.success) {
                handleSuccess(data.message, data.success)
            }
            else {
                handleError(data.message)
            }

            return data;
        } catch (error) {
            handleError(error);
        }
    })




export const myOrders = createAsyncThunk('myOrders', async () => {

    try {
        const { data } = await axios.get("http://localhost:5000/api/orders/me", { withCredentials: true });
        return data
    } catch (error) {
        console.log(error)
    }

})


export const getSingleOrder = createAsyncThunk('getSingleOrder', async (id) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/api/order/${id}`, { withCredentials: true });
        console.log(data);
        return data;
    } catch (error) {
        console.log(error)
    }
})

const initialState = {
    isLoading: false,
    isError: false,
    data: {},
    userOrders: null,
    singleOrder: null
}


const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getUserInfo.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getUserInfo.rejected, (state, action) => {
            state.isError = true;
        });
        builder.addCase(myOrders.fulfilled, (state, action) => {
            state.userOrders = action.payload;
            state.isLoading = false;
        });
        builder.addCase(myOrders.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(myOrders.rejected, (state, action) => {
            state.isError = true;
        });
        builder.addCase(getSingleOrder.fulfilled, (state, action) => {
            state.singleOrder = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getSingleOrder.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getSingleOrder.rejected, (state, action) => {
            state.isError = true;
        });
    }
})
export default userSlice.reducer;


