import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "./user";

export const store = configureStore({
  reducer: {
    user: userSlicer,
  },
});
