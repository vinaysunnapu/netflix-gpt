import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
  return (
    <div className="relative h-screen flex flex-col overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-black">
        <img className="h-full w-full object-cover opacity-50" src={BG_URL} alt="background" />
      </div>
      
      {/* Container spacing for the fixed header */}
      <div className="flex-shrink-0 pt-48 md:pt-20 pb-4">
        <GptSearchBar />
      </div>

      <div className="flex-1 flex overflow-hidden">
        <GptMovieSuggestions />
      </div>
    </div>
  );
};
export default GPTSearch;
