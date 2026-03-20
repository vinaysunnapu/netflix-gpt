import { useRef, useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import type { Movie } from "../types";

const MovieList: React.FC<{ title: string; movies: Movie[] }> = ({ title, movies }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  // Checks available scroll room and updates button visibility
  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 0);
      // Using -1 gives a 1px buffer for cross-browser subpixel rounding
      setShowRight(Math.ceil(scrollLeft) < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    // Initial check when component mounts or `movies` prop updates
    checkScrollability();
    
    // Re-check on window resize
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [movies]);

  const scrollLeftAction = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };

  const scrollRightAction = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };

  return (
    <div className="px-6 mb-8">
      <h1 className="text-lg md:text-3xl py-4 text-white font-semibold flex items-center">{title}</h1>
      
      <div className="relative group">
        {showLeft && (
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-full bg-black/50 text-white hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-black/80 rounded-r-md"
            onClick={scrollLeftAction}
          >
            <span className="text-5xl font-bold drop-shadow-xl">&lsaquo;</span>
          </button>
        )}

        <div 
          ref={scrollRef} 
          className="flex overflow-x-scroll scroll-smooth"
          onScroll={checkScrollability}
        >
          <div className="flex">
            {movies?.map((movie) => (
              <MovieCard key={movie.id} movieId={movie.id} posterPath={movie.poster_path} />
            ))}
          </div>
        </div>

        {showRight && (
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-full bg-black/50 text-white hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-black/80 rounded-l-md"
            onClick={scrollRightAction}
          >
            <span className="text-5xl font-bold drop-shadow-xl">&rsaquo;</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieList;