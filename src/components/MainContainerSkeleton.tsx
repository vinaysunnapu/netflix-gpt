const MainContainerSkeleton = () => {
  return (
    <div className="w-screen aspect-video pt-[30%] md:pt-[20%] px-6 md:px-24 bg-gray-900 border-b border-gray-800 animate-pulse relative z-10">
      <div className="w-2/3 md:w-1/3 h-8 md:h-16 bg-gray-700 rounded-md mb-4 mt-8 md:mt-0"></div>
      <div className="hidden md:block w-1/4 h-24 bg-gray-700 rounded-md mb-6"></div>
      <div className="flex gap-3 mt-4 md:mt-0">
        <div className="w-24 md:w-32 h-10 md:h-14 bg-gray-700 rounded-md"></div>
        <div className="hidden md:block w-32 md:w-40 h-10 md:h-14 bg-gray-700 rounded-md"></div>
      </div>
    </div>
  );
};

export default MainContainerSkeleton;
