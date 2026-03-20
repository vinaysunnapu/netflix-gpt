import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTrailerModalMovieId } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
import type { RootState, TMDBResponse, Video } from "../types";

const TrailerModal = () => {
  const dispatch = useDispatch();
  const movieId = useSelector((store: RootState) => store.movies.trailerModalMovieId);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) {
      setTrailerKey(null);
      return;
    }

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

  if (!movieId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl aspect-video px-4 md:px-12">
        <button
          onClick={() => dispatch(setTrailerModalMovieId(null))}
          className="absolute -top-12 right-4 md:right-12 text-white text-3xl font-bold hover:text-red-600 transition z-50 cursor-pointer"
        >
          &times;
        </button>
        {trailerKey ? (
          <iframe
            className="w-full h-full rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.8)]"
            src={"https://www.youtube.com/embed/" + trailerKey + "?autoplay=1"}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-xl bg-black rounded-lg">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default TrailerModal;
