import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import themeReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    theme: themeReducer,
  },
});

export default store;
