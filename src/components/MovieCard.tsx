import { IMG_CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setTrailerModalMovieId } from "../utils/moviesSlice";

const MovieCard: React.FC<{ posterPath: string | null; movieId: number }> = ({ posterPath, movieId }) => {
  const dispatch = useDispatch();

  if (!posterPath) return null;
  return (
    <div
      className="w-36 md:w-48 pr-4 cursor-pointer hover:scale-105 transition-transform duration-300"
      onClick={() => dispatch(setTrailerModalMovieId(movieId))}
    >
      <img alt="Movie Card" src={IMG_CDN_URL + posterPath} className="rounded-md" />
    </div>
  );
};
export default MovieCard;