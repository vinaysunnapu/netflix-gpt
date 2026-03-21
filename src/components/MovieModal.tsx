import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../types";
import { closeModal } from "../redux/store/slices/modalSlice";
import { IMG_CDN_URL } from "../utils/constants";

const MovieModal = () => {
  const dispatch = useDispatch();
  // We need to type modal dynamically correctly if RootState doesn't have it defined properly
  const { isOpen, movieDetails } = useSelector((store: RootState & { modal: any }) => store.modal);

  if (!isOpen || !movieDetails) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#141414] text-white w-full max-w-2xl rounded-xl shadow-2xl min-h-[400px] overflow-hidden relative border border-gray-700 animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={() => dispatch(closeModal())}
          className="absolute top-4 right-4 bg-black/60 hover:bg-black p-2 rounded-full z-10 transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Backdrop Image */}
        <div className="relative w-full h-64 md:h-80 bg-gray-900 line-clamp-2">
          <img 
            src={IMG_CDN_URL + movieDetails.backdrop_path} 
            alt={movieDetails.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 relative -mt-20 z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{movieDetails.original_title || movieDetails.title}</h2>
          
          <div className="flex items-center gap-4 text-sm md:text-base font-semibold text-gray-300 mb-6 drop-shadow-md">
            <span className="text-green-500">{(movieDetails.vote_average * 10).toFixed(0)}% Match</span>
            <span>{movieDetails.release_date?.split('-')[0]}</span>
            <span className="border border-gray-500 px-2 rounded-sm text-xs">HD</span>
          </div>
          
          <p className="text-gray-200 text-sm md:text-lg leading-relaxed">{movieDetails.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
