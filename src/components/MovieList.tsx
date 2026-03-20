import { useRef } from "react";
import MovieCard from "./MovieCard";
import type { Movie } from "../types";

const MovieList: React.FC<{ title: string; movies: Movie[] }> = ({ title, movies }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };

  return (
    <div className="px-6 mb-8">
      <h1 className="text-lg md:text-3xl py-4 text-white font-semibold flex items-center">{title}</h1>
      
      <div className="relative group">
        <button 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-full bg-black/40 text-white hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-black/70 rounded-r-md"
          onClick={scrollLeft}
        >
          <span className="text-5xl font-bold drop-shadow-xl">&lsaquo;</span>
        </button>

        <div 
          ref={scrollRef} 
          className="flex overflow-x-scroll"
        >
          <div className="flex">
            {movies?.map((movie) => (
              <MovieCard key={movie.id} movieId={movie.id} posterPath={movie.poster_path} />
            ))}
          </div>
        </div>

        <button 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-full bg-black/40 text-white hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-black/70 rounded-l-md"
          onClick={scrollRight}
        >
          <span className="text-5xl font-bold drop-shadow-xl">&rsaquo;</span>
        </button>
      </div>
    </div>
  );
};
export default MovieList;