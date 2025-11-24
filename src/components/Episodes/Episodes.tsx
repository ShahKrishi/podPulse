import React from "react";
import Post from "../post/Post";
import Upcoming from "../../assets/images/upcoming.jpg";
import { useGetAllEpisodeQuery } from "../../utils/services/EpisodeApi";
import Playing from "../player/Player";

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
          // playOnClick={}
        />
      ))}
    </div>
  );
};

export default Episodes;
