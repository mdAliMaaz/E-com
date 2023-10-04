import { createSlice } from "@reduxjs/toolkit";
import { handleSuccess, } from '../../helper/notification'

const initialState = JSON.parse(localStorage.getItem("myCart")) || [
]

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addItemToCart: (state, action) => {
            if (state.length !== 0) {

                let index = state.findIndex(x => x.product === action.payload.product);
                if (index < 0) {
                    state.push(action.payload)
                    localStorage.setItem("myCart", JSON.stringify(state))
                    handleSuccess("item added successfully", true)
                }
                else {
                    state[index] = action.payload;
                    localStorage.setItem("myCart", JSON.stringify(state))
                    handleSuccess("item added successfully", true)
                }
            }
            else {
                state.push(action.payload);
                localStorage.setItem("myCart", JSON.stringify(state))
                handleSuccess("item added successfully", true)
            }
        },

        removeItemFromCart: (state, action) => {
            state.splice(action.payload, 1)
            localStorage.setItem("myCart", JSON.stringify(state))
        },

        checkout: (state, action) => {
            localStorage.setItem("userAdress", JSON.stringify(action.payload))
        }
    }
})


export const { addItemToCart, removeItemFromCart, checkout } = cartSlice.actions;

export default cartSlice.reducer;