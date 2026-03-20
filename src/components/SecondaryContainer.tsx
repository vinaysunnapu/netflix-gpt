import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import MovieListSkeleton from "./MovieListSkeleton";
import type { RootState } from "../types";

const SecondaryContainer = () => {
  const movies = useSelector((store: RootState) => store.movies);

  if (!movies.nowPlayingMovies) {
    return (
      <div className="bg-black">
        <div className="mt-0 md:-mt-52 pl-4 md:pl-12 relative z-20">
          <MovieListSkeleton />
          <MovieListSkeleton />
          <MovieListSkeleton />
          <MovieListSkeleton />
          <MovieListSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black">
      <div className="mt-0 md:-mt-52 pl-4 md:pl-12 relative z-20">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies || []} />
        <MovieList title={"Trending"} movies={movies.trendingMovies || []} />
        <MovieList title={"Popular"} movies={movies.popularMovies || []} />
        <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies || []} />
        <MovieList title={"Horror"} movies={movies.horrorMovies || []} />
      </div>
    </div>
  );
};
export default SecondaryContainer;
