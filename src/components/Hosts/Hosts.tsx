import React from "react";
import Post from "../post/Post";
import Upcoming from "../../assets/images/upcoming.jpg";
import { useGetAllHostQuery } from "../../utils/services/HostApi";

interface HostProps {
  id: string;
  firstName: string;
  lastName: string;
  profilePic?: string;
  image?: string;
  bio?: string;
}

const Hosts: React.FC = () => {
  const { data: hosts, isLoading, isError } = useGetAllHostQuery({});

  if (isLoading) return <p className="text-center">Loading hosts...</p>;
  if (isError) return <p className="text-center">Failed to load hosts.</p>;

  return (
    <div className="flex gap-10 ml-12 my-4 flex-wrap">
      {hosts?.slice(0, 3).map((host: HostProps) => (
        <Post
          key={host.id}
          firstname={host.firstName || "John"}
          lastname={host.lastName || "Doe"}
          profilePic={host.profilePic || Upcoming}
          image={host.image || Upcoming}
          description={
            host.bio ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec mattis."
          }
          variant="alt"
        />
      ))}
    </div>
  );
};

export default Hosts;
