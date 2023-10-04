import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'



const getAdmin = createAsyncThunk('getAdmin', async () => {

})



const initialState = {};


const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

    }
})


export default adminSlice.reducer;