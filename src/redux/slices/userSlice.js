import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: JSON.parse(localStorage.getItem('userInfo'))
  },
  reducers: {
    setUser: (state, param) => {
      const { payload } = param;
      state.value = payload;
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer