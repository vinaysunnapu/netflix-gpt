import MovieCardSkeleton from "./MovieCardSkeleton";

const MovieListSkeleton = () => {
  return (
    <div className="px-6 py-4">
      {/* Title skeleton */}
      <div className="w-48 h-8 bg-gray-800 rounded-md mb-4 animate-pulse"></div>
      
      {/* Cards row */}
      <div className="flex overflow-hidden">
        <div className="flex">
          <MovieCardSkeleton />
          <MovieCardSkeleton />
          <MovieCardSkeleton />
          <MovieCardSkeleton />
          <MovieCardSkeleton />
          <MovieCardSkeleton />
          <MovieCardSkeleton />
          <MovieCardSkeleton />
          <MovieCardSkeleton />
        </div>
      </div>
    </div>
  );
};

export default MovieListSkeleton;
