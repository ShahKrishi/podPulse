import React, { useRef, useState } from "react";
import Post from "../post/Post";
import Upcoming from "../../assets/images/upcoming.jpg";
import { useGetAllEpisodeQuery } from "../../utils/services/EpisodeApi";
import Playing from "../player/Player";
import Dhun from "../../assets/audio/Dhun Paryushan.mp3";

interface EpisodeProps {
  id: string;
  title: string;
  categoryName: string;
  duration: string;
  image: string;
  profilePic: string;
  firstname: string;
  lastname: string;
}

const Episodes: React.FC = () => {
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(new Audio(Dhun));

  const handleListen = (audioUrl: string) => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
    }

    if (audioRef.current.src !== audioUrl) {
      audioRef.current.pause();
      audioRef.current = new Audio(audioUrl);
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }

    setCurrentAudio(audioUrl);
  };

  const { data: episodes, isLoading, isError } = useGetAllEpisodeQuery({});

  if (isLoading) return <p className="text-center">Loading episodes...</p>;
  if (isError) return <p className="text-center">Failed to load episodes.</p>;

  return (
    <div className="flex gap-4 my-4 p-4 justify-center">
      {episodes?.slice(0, 3).map((episode: EpisodeProps) => (
        <Post
          key={episode.id}
          firstname={episode.firstname || "John"}
          lastname={episode.lastname || "Doe"}
          profilePic={episode.profilePic || Upcoming}
          image={episode.image || Upcoming}
          title={episode.title}
          category={episode.categoryName}
          variant="default"
          time={episode.duration}
          playOnClick={() => {
            handleListen(Dhun);
          }}
        />
      ))}

      {currentAudio && (
        <div className="fixed bottom-0 left-0 w-full z-50">
          <Playing
            title="Dhun Paryushan"
            username="Podcast Artist"
            isPlaying={isPlaying}
            onPlay={() => {
              audioRef.current?.play();
              setIsPlaying(true);
            }}
            onPause={() => {
              audioRef.current?.pause();
              setIsPlaying(false);
            }}
            onNext={() => console.log("Next clicked")}
            onPrevious={() => console.log("Previous clicked")}
          />
        </div>
      )}
    </div>
  );
};

export default Episodes;
