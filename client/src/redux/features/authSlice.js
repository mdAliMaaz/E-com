import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { handleError, handleSuccess } from '../../helper/notification'



export const register = createAsyncThunk("register", async (formData) => {
    try {
        const response = await fetch("http://localhost:5000/api/users/", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        handleSuccess(data.message, data.success);

        setTimeout(() => {
            return window.location.replace("/login");
        }, 1000);

    } catch (error) {

        return handleError(error.message);

    }
})


export const login = createAsyncThunk("login", async (formData) => {
    try {
        const response = await fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            credentials: "include",
            body: formData,
        });
        const data = await response.json();

        handleSuccess(data.message, data.success);

        setTimeout(() => {
            window.location.replace("/");
        }, 1000)
        if (data.success) {
            localStorage.setItem("user", data.name)
        }
        else {
            localStorage.removeItem("user")
        }

        return data
    } catch (error) {
        return handleError(error.message);
    }
})


export const logout = createAsyncThunk("logout", async () => {
    try {

        const response = await fetch("http://localhost:5000/api/users/logout", { method: "POST", credentials: "include" })

        const data = await response.json()

        if (data.success) {
            handleSuccess(data.message, data.success)
            localStorage.removeItem("user")
            setTimeout(() => {
                window.location.replace("/login")
            }, 1000)
        }
        else {
            handleError(data.message)
        }
        return data;
    } catch (error) {
        return handleError(error.message);
    }
})

export const forgotPassword = createAsyncThunk("forgotPassword", async (formData) => {

    try {
        const response = await fetch("http://localhost:5000/api/users/password/forgot", { method: "POST", credentials: "include", body: formData })
        const data = await response.json()
        if (data.success) {
            handleSuccess(data.message, data.success)
        }
        else {
            handleError(data.message)
        }
        return data
    } catch (error) {
        handleError(error.message);
    }
})

export const resetPassword = createAsyncThunk('resetPassword', async ({ formData, token }) => {

    try {
        const response = await fetch(`http://localhost:5000/api/users/password/reset/${token}`, { credentials: "include", method: "PUT", body: formData })

        const data = await response.json()
        if (data.success) {
            handleSuccess(data.message, data.success)
            setTimeout(() => {
                window.location.replace('/login')
            }, 1000)
        }
        else {
            handleError(data.message)
        }
        return data
    } catch (error) {
        handleError(error.message);
    }
})
const initialState = {
    isLoading: false,
    isError: false,
    data: {}
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(register.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.isError = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isError = true;
        });
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(logout.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoading = true;
            state.data = action.payload;
            state.isLoading = false
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.isError = true;
        });
    }
})


export default authSlice.reducer

