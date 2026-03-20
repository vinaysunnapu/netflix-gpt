import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrendingMovies } from "../utils/moviesSlice";
import type { RootState, TMDBResponse, Movie } from "../types";

const useTrendingMovies = () => {
  const dispatch = useDispatch();
  const trendingMovies = useSelector((store: RootState) => store.movies.trendingMovies);

  const getTrendingMovies = async () => {
    const data = await fetch("https://api.themoviedb.org/3/trending/movie/week?page=1", API_OPTIONS);
    const json: TMDBResponse<Movie> = await data.json();
    dispatch(addTrendingMovies(json.results));
  };

  useEffect(() => {
    if (!trendingMovies) {
      getTrendingMovies();
    }
  }, [trendingMovies]);
};

export default useTrendingMovies;