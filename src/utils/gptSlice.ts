import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { GPTState, Movie } from "../types";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieResults: null,
    movieNames: null,
    isGptLoading: false,
  } as GPTState,
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult: (state, action: PayloadAction<{ movieNames: string[]; movieResults: Movie[][] }>) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    setIsGptLoading: (state, action: PayloadAction<boolean>) => {
      state.isGptLoading = action.payload;
    },
  },
});

export const { toggleGptSearchView, addGptMovieResult, setIsGptLoading } = gptSlice.actions;

export default gptSlice.reducer;