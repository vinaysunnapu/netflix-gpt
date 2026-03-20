import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MoviesState, Movie, Video } from "../types";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trendingMovies: null,
    popularMovies: null,
    upcomingMovies: null,
    horrorMovies: null,
    trailerVideo: null,
    trailerModalMovieId: null,
  } as MoviesState,
  reducers: {
    addNowPlayingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrendingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.trendingMovies = action.payload;
    },
    addPopularMovies: (state, action: PayloadAction<Movie[]>) => {
      state.popularMovies = action.payload;
    },
    addUpcomingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.upcomingMovies = action.payload;
    },
    addHorrorMovies: (state, action: PayloadAction<Movie[]>) => {
      state.horrorMovies = action.payload;
    },
    addTrailerVideo: (state, action: PayloadAction<Video>) => {
      state.trailerVideo = action.payload;
    },
    setTrailerModalMovieId: (state, action: PayloadAction<number | null>) => {
      state.trailerModalMovieId = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrendingMovies,
  addPopularMovies,
  addUpcomingMovies,
  addHorrorMovies,
  addTrailerVideo,
  setTrailerModalMovieId,
} = moviesSlice.actions;

export default moviesSlice.reducer;