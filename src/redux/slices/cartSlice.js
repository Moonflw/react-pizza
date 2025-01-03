import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: []
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(obj =>  obj.id === action.payload.id)
        if (findItem) {
          findItem.count++
        }
        else {
            state.items.push({
                ...action.payload,
                count: 1,
            });
        }
        state.totalPrice = state.items.reduce((sum, obj)=> sum + (obj.price * obj.count), 0)
    },
    minusItem(state, action){
      const findItem = state.items.find(obj =>  obj.id === action.payload.id)
        if (findItem.count >= 2) {
          findItem.count--
        }
     },
    removeItem(state, action) {
      state.items = state.items.filter(obj => obj === action.payload);
    },
    clearItems(state) {
        state.items = [];
        state.totalPrice = 0
    },
  },
});

export const selectCart = (state)=> state.cart

export const { addItem, removeItem, clearItems, minusItem, } = cartSlice.actions;

export default cartSlice.reducer;
