import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import type { RootState, Movie } from "../types";

const MainContainer = () => {
  const movies = useSelector((store: RootState) => store.movies?.nowPlayingMovies);

  if (!movies) return;

  const mainMovie: Movie = movies[0];

  const { original_title, overview, id } = mainMovie;

  return (
    <div>
      <VideoTitle title={original_title || mainMovie.title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};
export default MainContainer;