const MovieCardSkeleton = () => {
  return (
    <div className="w-36 md:w-48 pr-4 aspect-[2/3] flex-shrink-0 animate-pulse">
      <div className="w-full h-full bg-gray-800 rounded-md"></div>
    </div>
  );
};

export default MovieCardSkeleton;
