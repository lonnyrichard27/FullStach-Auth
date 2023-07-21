import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // check localstorage for userinfo if its there convert it to an object and if its not there null
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      // clear the info
      state.userInfo = null;
      localStorage.removeItem('userInfo')
    }
  }
})

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;