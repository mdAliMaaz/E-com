import { createSlice } from "@reduxjs/toolkit";


const initialState = JSON.parse(localStorage.getItem("myCart")) || [
]

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            if (state.length !== 0) {

                let index = state.findIndex(x => x.id === action.payload.id);

                if (index < 0) {
                    state.push(action.payload)
                    localStorage.setItem("myCart", JSON.stringify(state))
                }
                else {
                    state[index] = action.payload;
                    localStorage.setItem("myCart", JSON.stringify(state))
                }
            }
            else {
                state.push(action.payload);
                localStorage.setItem("myCart", JSON.stringify(state))
            }
        },
        removeItemFromCart: (state, action) => {
            state.splice(action.payload, 1)
            localStorage.setItem("myCart", JSON.stringify(state))
        }
    }
})


export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;