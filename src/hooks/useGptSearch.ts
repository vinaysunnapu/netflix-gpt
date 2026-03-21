import { GoogleGenerativeAI } from "@google/generative-ai";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult, setIsGptLoading } from "../redux/store/slices/gptSlice";
import type { TMDBResponse, Movie } from "../types";

const useGptSearch = () => {
  const dispatch = useDispatch();
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(geminiApiKey);

  const searchMovieTMDB = async (movie: string): Promise<Movie[]> => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json: TMDBResponse<Movie> = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async (e: React.FormEvent<HTMLFormElement>, searchText: string) => {
    e.preventDefault();

    if (!searchText.trim()) return;

    console.log("Searching for: ", searchText);

    dispatch(setIsGptLoading(true));

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });

      const result = await model.generateContent(gptQuery);

      const response = await result.response;
      const text = response.text();

      console.log("Gemini response:", text.split(","));
      const gptMovies: string[] = text.split(",");

      const promiseArray: Promise<Movie[]>[] = gptMovies.map((movie) => searchMovieTMDB(movie.trim()));

      const tmdbResults: Movie[][] = await Promise.all(promiseArray);

      console.log(tmdbResults);

      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );

    } catch (error) {
      console.error("Error:", error);
    } finally {
      dispatch(setIsGptLoading(false));
    }
  };

  return { handleGptSearchClick, searchMovieTMDB };
};

export default useGptSearch;
