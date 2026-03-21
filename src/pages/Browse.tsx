import Header from "../components/Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useHorrorMovies from "../hooks/useHorrorMovies";
import MainContainer from "../components/MainContainer";
import SecondaryContainer from "../components/SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import GptSearch from "../components/GptSearch";
import TrailerModal from "../components/TrailerModal";
import MovieModal from "../components/MovieModal";
import { useSelector } from "react-redux";
import type { RootState } from "../types";

const Browse = () => {
  const showGptSearch = useSelector((store: RootState) => store.gpt.showGptSearch);

  useNowPlayingMovies();
  useTrendingMovies();
  usePopularMovies();
  useUpcomingMovies();
  useHorrorMovies();

  return (
    <div>
      <Header />
      <TrailerModal />
      <MovieModal />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
