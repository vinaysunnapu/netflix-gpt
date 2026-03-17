import lang from "../utils/languageConstants";
import { useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
import type { RootState, TMDBResponse, Movie } from "../types";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store: RootState) => store.config.lang);
  const searchText = useRef<HTMLInputElement | null>(null);
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

  const handleGptSearchClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Searching for: ", searchText.current?.value);

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current?.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" }); // or gemini-1.5-flash

      const result = await model.generateContent(gptQuery);

      const response = await result.response;
      const text = response.text();

      console.log("Gemini response:", text.split(","));
      const gptMovies: string[] = text.split(",");

      const promiseArray: Promise<Movie[]>[] = gptMovies.map((movie) => searchMovieTMDB(movie.trim()));
      // [Promise, Promise, Promise, Promise, Promise]

      const tmdbResults: Movie[][] = await Promise.all(promiseArray);

      console.log(tmdbResults);

      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        onSubmit={handleGptSearchClick}
        className=" w-1/2 bg-black grid grid-cols-12"
      >
        <input
          ref={searchText}
          type="text"
          className=" p-4 m-4 col-span-9 placeholder-white text-white"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;
