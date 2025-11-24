import React from "react";
import Post from "../post/Post";
import Upcoming from "../../assets/images/upcoming.jpg";
import { useGetAllHostQuery } from "../../utils/services/HostApi";
import { useNavigate } from "react-router-dom";
import { HOST_DETAILS, HOST_PAGE } from "../../routes/RoutesNames";

interface HostProps {
  hostID: number;
  firstName: string;
  lastName: string;
  profilePic?: string;
  image?: string;
  bio?: string;
}

const Hosts: React.FC = () => {
  const navigate = useNavigate();

  const { data: hosts, isLoading, isError } = useGetAllHostQuery({});

  if (isLoading) return <p className="text-center">Loading hosts...</p>;
  if (isError) return <p className="text-center">Failed to load hosts.</p>;

  return (
    <div className="flex gap-10 ml-12 my-4 flex-wrap">
      {hosts?.slice(0, 3).map((host: HostProps) => (
        <Post
          key={host.hostID}
          firstname={host.firstName || "John"}
          lastname={host.lastName || "Doe"}
          profilePic={host.profilePic || Upcoming}
          image={host.image || Upcoming}
          description={
            host.bio ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec mattis."
          }
          variant="alt"
          listenOnClick={() => {
            navigate(`${HOST_PAGE}/${HOST_DETAILS}/${host.hostID}`);
          }}
        />
      ))}
    </div>
  );
};

export default Hosts;
