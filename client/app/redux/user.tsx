import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  basket: [],
};

export const userSlicer = createSlice({
  name: "USER",
  initialState,
  reducers: {
    setUserSlicer: (state, action) => {
      state.user = action.payload;
    },
    setUserBasket: (state, action) => {
      state.basket = action.payload;
    },
  },
});
export const { setUserSlicer, setUserBasket } = userSlicer.actions;
export default userSlicer.reducer;
