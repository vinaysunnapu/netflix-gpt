import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import MovieListSkeleton from "./MovieListSkeleton";
import type { RootState } from "../types";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames, isGptLoading } = useSelector((store: RootState) => store.gpt);

  if (isGptLoading) {
    return (
      <div className="p-4 m-2 bg-black text-white bg-opacity-90 flex-1 overflow-y-auto custom-scrollbar rounded-xl">
        <MovieListSkeleton />
        <MovieListSkeleton />
        <MovieListSkeleton />
      </div>
    );
  }

  if (!movieNames) return null;

  return (
    <div className="p-4 m-2 bg-black text-white bg-opacity-90 flex-1 overflow-y-auto custom-scrollbar rounded-xl">
      <div>
        {movieNames.map((movieName: string, index: number) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults ? movieResults[index] : []}
          />
        ))}
      </div>
    </div>
  );
};
export default GptMovieSuggestions;