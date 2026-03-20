// Type definitions for Netflix GPT app

export interface Movie {
  id: number;
  title: string;
  original_title?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  adult?: boolean;
  original_language?: string;
  popularity?: number;
  video?: boolean;
  vote_count?: number;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  published_at?: string;
  size?: number;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface GPTState {
  showGptSearch: boolean;
  movieResults: Movie[][] | null;
  movieNames: string[] | null;
}

export interface ConfigState {
  lang: Language;
}

export interface MoviesState {
  nowPlayingMovies: Movie[] | null;
  trendingMovies: Movie[] | null;
  popularMovies: Movie[] | null;
  upcomingMovies: Movie[] | null;
  horrorMovies: Movie[] | null;
  trailerVideo: Video | null;
  trailerModalMovieId: number | null;
}

export interface UserState {
  user: User | null;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type Language = 'en' | 'hindi' | 'spanish';

export interface LanguageConstants {
  [key: string]: {
    search: string;
    gptSearchPlaceholder: string;
    // Add more as needed
  };
}

export type RootState = {
  user: User | null;
  movies: MoviesState;
  gpt: GPTState;
  config: ConfigState;
};

export type AppDispatch = any; // We'll import this from store