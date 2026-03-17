import lang from "../utils/languageConstants";
import { useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(geminiApiKey);

//   const handleGptSearchClick = async (e: any) => {
//     e.preventDefault();
//     console.log("Searching for: ", searchText.current.value);
//     // Implement GPT Search Logic here

//     const gptQuery =
//       "Act as a Movie Recommendation system and suggest some movies for the query : " +
//       searchText.current.value +
//       ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

//     const response = await openai.responses.create({
//       model: "gpt-5.2",
//       instructions: "You are a movie recommendation system",
//       input: gptQuery,
//     });
//     console.log("gpt response:", response.output_text);
//   };


const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

const handleGptSearchClick = async (e: any) => {
  e.preventDefault();

  console.log("Searching for: ", searchText.current.value);

  const gptQuery =
    "Act as a Movie Recommendation system and suggest some movies for the query : " +
    searchText.current.value +
    ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" }); // or gemini-1.5-flash

    const result = await model.generateContent(gptQuery);

    const response = await result.response;
    const text = response.text();

    console.log("Gemini response:", text.split(","));
    const gptMovies = text.split(",");

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);

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
