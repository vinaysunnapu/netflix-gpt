import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../redux/store/slices/moviesSlice";
import type { RootState, TMDBResponse, Movie } from "../types";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store: RootState) => store.movies.upcomingMovies);

  const getUpcomingMovies = async () => {
    const data = await fetch("https://api.themoviedb.org/3/movie/upcoming?page=1", API_OPTIONS);
    const json: TMDBResponse<Movie> = await data.json();
    dispatch(addUpcomingMovies(json.results));
  };

  useEffect(() => {
    if (!upcomingMovies) {
      getUpcomingMovies();
    }
  }, [upcomingMovies]);
};

export default useUpcomingMovies;