import React from "react";

const VideoTitle: React.FC<{ title: string; overview: string }> = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
      <div className="my-4 md:m-0 flex items-center gap-3">
        <button className="flex items-center gap-2 bg-white text-black py-2 px-6 md:py-3 md:px-10 text-base md:text-xl font-semibold rounded-md hover:bg-opacity-80 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg group cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5 md:w-8 md:h-8 group-hover:scale-110 transition-transform duration-300"
          >
            <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
          </svg>
          Play
        </button>
        <button className="hidden md:flex items-center gap-2 bg-gray-500/70 text-white py-3 px-10 text-xl font-semibold rounded-md hover:bg-gray-500/90 transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm shadow-lg group cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-12 transition-transform duration-300"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          More Info
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;