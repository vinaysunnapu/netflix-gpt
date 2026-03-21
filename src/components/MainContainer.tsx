import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import MainContainerSkeleton from "./MainContainerSkeleton";
import type { RootState, Movie } from "../types";

const MainContainer = () => {
  const movies = useSelector((store: RootState) => store.movies?.nowPlayingMovies);

  if (!movies) return <MainContainerSkeleton />;

  const mainMovie: Movie = movies[0];

  const { id } = mainMovie;

  return (
    <div className="pt-[30%] bg-black md:pt-0">
      <VideoTitle movie={mainMovie} />
      <VideoBackground movieId={id} />
    </div>
  );
};
export default MainContainer;