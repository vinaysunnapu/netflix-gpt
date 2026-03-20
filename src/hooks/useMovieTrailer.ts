import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import type { RootState, TMDBResponse, Video } from "../types";

const useMovieTrailer = (movieId: number) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store: RootState) => store.movies.trailerVideo);
  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json: TMDBResponse<Video> = await data.json();

    const filterData = json.results.filter((video: Video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
  };
  useEffect(() => {
    if (!trailerVideo) {
      getMovieVideos();
    }
  }, [trailerVideo]);
};

export default useMovieTrailer;