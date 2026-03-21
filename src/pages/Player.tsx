import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_OPTIONS } from "../utils/constants";
import type { TMDBResponse, Video } from "../types";

const Player = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [videoKey, setVideoKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          API_OPTIONS
        );
        const json: TMDBResponse<Video> = await data.json();
        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        setVideoKey(trailer?.key || null);
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };
    if (movieId) fetchVideo();
  }, [movieId]);

  return (
    <div className="w-screen h-screen bg-black relative">
      <button 
        onClick={() => navigate(-1)} 
        className="absolute top-8 left-8 p-3 px-6 bg-white/20 hover:bg-white/40 text-white rounded-lg backdrop-blur-md z-50 flex items-center gap-2 group transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 group-hover:-translate-x-1 transition-transform">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Back
      </button>

      {videoKey ? (
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=0&controls=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="flex items-center justify-center w-full h-full text-white text-2xl">
          Loading...
        </div>
      )}
    </div>
  );
};

export default Player;
