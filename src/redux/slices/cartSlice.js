import { createSlice } from '@reduxjs/toolkit'


export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: {
      items: [],
      totalQuantity: 0,
      totalAmount: 0,
    }
  },
  reducers: {
    addToCart: (state, param) => {
      const { payload } = param;
      const exist = state.value.items.findIndex(f => f.id == payload.id);
      console.log(state.value.items[exist]);
      if (exist > -1) {
        state.value.items[exist].quantity += 1;
        state.value.totalAmount += state.value.items[exist].price;
        state.value.totalQuantity += 1;
      } else {
        const newPayload = { ...payload, quantity: 1 };
        state.value = {
          ...state.value,
          items: [...state.value.items, newPayload],
          totalQuantity: state.value.totalQuantity + 1,
          totalAmount: state.value.totalAmount + payload.price
        };
      }
    },
    removeFromCart: (state, param) => {
      const { payload } = param;
      console.log(payload);
      const exist = state.value.items.findIndex(f => f.id == payload);
      if (exist > -1) {
        state.value.items[exist].quantity = state.value.items[exist].quantity - 1;
        state.value.totalAmount = state.value.totalAmount - state.value.items[exist].price;
        if (state.value.items[exist].quantity == 0) {
          state.value.items.splice(exist, 1);
        }
        console.log(state.value.items[exist]);
        state.value.totalQuantity -= 1;
      }
    }
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer