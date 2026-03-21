import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "../types";

interface ModalState {
  isOpen: boolean;
  movieDetails: Movie | null;
}

const initialState: ModalState = {
  isOpen: false,
  movieDetails: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Movie>) => {
      state.isOpen = true;
      state.movieDetails = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.movieDetails = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
