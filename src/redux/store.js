import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import cartReducer from './slices/cartSlice'
import { dummyApi } from './api/dummyApi'

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    [dummyApi.reducerPath]: dummyApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dummyApi.middleware),
})


export default store;
