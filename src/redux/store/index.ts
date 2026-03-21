import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import moviesReducer from "./slices/moviesSlice";
import gptReducer from "./slices/gptSlice";
import configReducer from "./slices/configSlice";
import modalReducer from "./slices/modalSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    config: configReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export default appStore;