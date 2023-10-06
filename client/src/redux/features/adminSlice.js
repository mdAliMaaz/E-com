import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { handleError, handleSuccess } from '../../helper/notification';
import axios from 'axios';



export const getAllUsers = createAsyncThunk('getAllUsers', async () => {
    try {
        const { data } = await axios.get("http://localhost:5000/api/admin/users", { withCredentials: true });
        return data;
    } catch (error) {
        handleError(error.message);
    }
})


export const updateRole = createAsyncThunk('updateRole', async (id) => {
    try {

        const { data } = await axios.post(`http://localhost:5000/api/admin/users/role/${id}`, {

        }, { withCredentials: true });

        if (data.success) {
            handleSuccess(data.message, data.success)
        }
        else {
            handleError(data.message);
        }
    } catch (error) {
        handleError(error.message);
    }
});


const initialState = {
    isLoading: false,
    isError: false,
    data: null,
};


const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getAllUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        }).addCase(getAllUsers.rejected, (state, action) => {
            state.isError = true;
        }).addCase(updateRole.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(updateRole.fulfilled, (state, action) => {
            state.isLoading = false;
        }).addCase(updateRole.rejected, (state, action) => {
            state.isError = true;
        });
    }
})


export default adminSlice.reducer;