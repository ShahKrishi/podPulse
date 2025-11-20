import React from "react";
import Polaroid from "../polaroid/Polaroid";
import podcastGirl from "../../assets/images/podcast-girl.jpg";
import { useGetAllPodcastQuery } from "../../utils/services/PodcastApi";

interface RecentOutPodcastProps {
  id: string | number;
  title: string;
  hostName: string;
  date: string;
  description: string;
  categorieName: string;
  image: string;
}

const RecentOutPodcast: React.FC = () => {
  const { data: episodes, isLoading, isError } = useGetAllPodcastQuery({});

  if (isLoading) return <div className="text-center">Loading podcasts...</div>;
  if (isError)
    return <div className="text-center">Failed to load podcasts.</div>;

  return (
    <div style={{ display: "flex", gap: "16px", padding: "20px" }}>
      {episodes?.slice(0, 4).map((episode: RecentOutPodcastProps) => (
        <Polaroid
          src={podcastGirl}
          title={episode.title}
          by={episode.hostName}
          on={episode.date}
          description={episode.description}
          category={episode.categorieName}
        />
      ))}
    </div>
  );
};

export default RecentOutPodcast;
