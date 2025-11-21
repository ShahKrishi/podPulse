import Upcoming from "../../assets/images/upcoming.jpg";
import PlayIcon from "../../assets/icons/play-colored.svg";
import PauseIcon from "../../assets/icons/pause.svg";
import NextIcon from "../../assets/icons/next.svg";
import PrevIcon from "../../assets/icons/previous.svg";

interface PlayingProps {
  title?: string;
  username?: string;
  time?: string;
  isPlaying?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

const Playing: React.FC<PlayingProps> = ({
  title,
  username,
  time,
  isPlaying = false,
  onPlay,
  onPause,
  onNext,
  onPrevious,
}) => {
  return (
    <div className="bg-[#02C7AD] relative p-3 border flex items-center gap-5">
      <img src={Upcoming} alt="Upcoming" className="h-20 w-20 object-cover" />

      <div className="flex flex-col flex-grow">
        <span className="font-semibold">{title || "Title will be here"}</span>
        <span className="text-gray-600">{username || "John Doe"}</span>
        {time && <span className="text-sm text-gray-500">{time}</span>}
      </div>

      <button
        onClick={onPrevious}
        aria-label="Previous"
        className="flex items-center justify-center w-8 h-8 bg-yellow-400 border border-black rounded-full transition-all duration-200"
      >
        <img src={PrevIcon} alt="Previous" className="w-4 h-4" />
      </button>

      <button
        onClick={isPlaying ? onPause : onPlay}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="flex items-center justify-center w-10 h-10 bg-yellow-400 border border-black rounded-full transition-all duration-300"
      >
        <img
          src={isPlaying ? PauseIcon : PlayIcon}
          alt={isPlaying ? "Pause" : "Play"}
          className="w-4 h-4"
        />
      </button>

      <button
        onClick={onNext}
        aria-label="Next"
        className="flex items-center justify-center w-8 h-8 bg-yellow-400 border border-black rounded-full transition-all duration-200"
      >
        <img src={NextIcon} alt="Next" className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Playing;
