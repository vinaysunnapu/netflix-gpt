import lang from "../utils/languageConstants";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../types";
import useGptSearch from "../hooks/useGptSearch";

const GptSearchBar = () => {
  const langKey = useSelector((store: RootState) => store.config.lang);
  const [searchText, setSearchText] = useState("");
  const { handleGptSearchClick } = useGptSearch();

  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={(e) => handleGptSearchClick(e, searchText)}
        className=" w-full md:w-1/2 bg-black grid grid-cols-12"
      >
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          className=" p-4 m-4 col-span-9 placeholder-white text-white"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button 
          disabled={!searchText.trim()}
          className={`col-span-3 m-4 py-2 px-4 rounded-lg transition-colors ${
            !searchText.trim() 
              ? "bg-red-400 cursor-not-allowed text-white/50" 
              : "bg-red-700 text-white cursor-pointer hover:bg-red-800"
          }`}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;
