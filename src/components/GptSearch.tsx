import { useDispatch, useSelector } from "react-redux";
import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";
import { setGptError } from "../redux/store/slices/gptSlice";
import type { RootState } from "../types";

const GPTSearch = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((store: RootState) => store.gpt.errorMessage);

  const closeErrorPopup = () => dispatch(setGptError(null));

  return (
    <div className="relative h-screen flex flex-col overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-black">
        <img className="h-full w-full object-cover opacity-50" src={BG_URL} alt="background" />
      </div>
      
      {errorMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={closeErrorPopup}></div>
          <div className="relative max-w-xl w-full rounded-3xl border border-red-500 bg-red-950 p-6 text-white shadow-2xl">
            <h2 className="text-xl font-semibold mb-3">Error</h2>
            <p className="mb-5 whitespace-pre-wrap">{errorMessage}</p>
            <button
              onClick={closeErrorPopup}
              className="rounded-lg bg-white px-4 py-2 font-semibold text-red-900 hover:bg-gray-100"
            >
              Close
            </button>
          </div>
        </div>
      )}

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
