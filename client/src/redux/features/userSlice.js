import { handleError, handleSuccess } from '../../helper/notification'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


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

const initialState = {
    isLoading: false,
    isError: false,
    data: {}
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
    }
})
export default userSlice.reducer;


