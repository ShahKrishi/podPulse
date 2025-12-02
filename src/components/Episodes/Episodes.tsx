import React, { useRef, useState } from "react";
import Post from "../post/Post";
import Upcoming from "../../assets/images/upcoming.jpg";
import { useGetAllEpisodeQuery } from "../../utils/services/EpisodeApi";
import Playing from "../player/Player";
import Dhun from "../../assets/audio/Dhun Paryushan.mp3";
import profile1 from "../../assets/images/bharati.webp";
import profile2 from "../../assets/images/rohitshetty.webp";
import profile3 from "../../assets/images/arjun.webp";
import podcast1 from "../../assets/images/podcastBharti.png";
import podcast2 from "../../assets/images/podcastRohit.png";
import podcast3 from "../../assets/images/podcastArjun.png";

interface EpisodeProps {
  id: string;
  title: string;
  categoryName: string;
  duration: string;
  image: string;
  profilePic: string;
  firstName: string;
  lastName: string;
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

  const staticProfileImages = [profile1, profile2, profile3];

  const staticThumbnailImages = [podcast1, podcast2, podcast3];

  return (
    <div className="flex gap-4 my-4 p-4 justify-center">
      {episodes?.slice(0, 3).map((episode: EpisodeProps, index: number) => (
        <Post
          key={episode.id}
          firstname={episode.firstName || "John"}
          lastname={episode.lastName || "Doe"}
          profilePic={
            episode.profilePic || staticProfileImages[index] || Upcoming
          }
          image={episode.image || staticThumbnailImages[index] || Upcoming}
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
