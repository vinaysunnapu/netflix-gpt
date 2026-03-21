import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTrailerModalMovieId } from "../redux/store/slices/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
import type { RootState, TMDBResponse, Video } from "../types";

const TrailerModal = () => {
  const dispatch = useDispatch();
  const movieId = useSelector((store: RootState) => store.movies.trailerModalMovieId);
  
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [renderNode, setRenderNode] = useState(false);

  // Handle Mount/Unmount Animations
  useEffect(() => {
    if (movieId) {
      setRenderNode(true);
      // Tiny delay allows the DOM to render the node before triggering opacity transition
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      // Wait for the exit animation (300ms) to complete before unmounting from DOM
      const timer = setTimeout(() => {
        setRenderNode(false);
        setTrailerKey(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [movieId]);

  // Handle Fetching Trailer logic
  useEffect(() => {
    if (!movieId) return;

    const fetchTrailer = async () => {
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US",
          API_OPTIONS
        );
        const json: TMDBResponse<Video> = await data.json();
        if (json.results && json.results.length > 0) {
            const filterData = json.results.filter((video) => video.type === "Trailer");
            const trailer = filterData.length ? filterData[0] : json.results[0];
            setTrailerKey(trailer?.key || null);
        } else {
             setTrailerKey(null);
        }
      } catch (error) {
        console.error("Failed to fetch trailer:", error);
      }
    };

    fetchTrailer();
  }, [movieId]);

  if (!renderNode) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-out ${isVisible ? 'opacity-100 bg-black/90 backdrop-blur-md' : 'opacity-0 bg-black/0 backdrop-blur-none'}`}
    >
      {/* Background click listener to close modal */}
      <div className="absolute inset-0 cursor-pointer" onClick={() => dispatch(setTrailerModalMovieId(null))}></div>

      <div 
        className={`relative w-full max-w-5xl aspect-video px-4 md:px-12 transition-all duration-300 ease-out transform ${isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-12 opacity-0'}`}
      >
        <button
          onClick={() => dispatch(setTrailerModalMovieId(null))}
          className="absolute -top-12 right-4 md:right-12 text-white text-4xl font-bold hover:text-red-600 transition z-50 cursor-pointer drop-shadow-md"
        >
          &times;
        </button>
        
        {trailerKey ? (
          <iframe
            className="w-full h-full rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.9)] bg-neutral-900 border-2 border-neutral-800"
            src={"https://www.youtube.com/embed/" + trailerKey + "?autoplay=1"}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-white bg-neutral-900 rounded-xl border-2 border-neutral-800 shadow-[0_0_40px_rgba(0,0,0,0.9)]">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xl font-medium tracking-wide">Loading Trailer...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrailerModal;
