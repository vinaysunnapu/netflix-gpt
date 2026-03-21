import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ConfigState, Language } from "../../../types";

const configSlice = createSlice({
  name: "config",
  initialState: {
    lang: "en",
  } as ConfigState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<Language>) => {
      state.lang = action.payload;
    },
  },
});

export const { changeLanguage } = configSlice.actions;

export default configSlice.reducer;