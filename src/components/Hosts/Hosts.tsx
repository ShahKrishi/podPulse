import React from "react";
import Post from "../post/Post";
import profile2 from "../../assets/images/bharati.webp";
import profile1 from "../../assets/images/rohitshetty.webp";
import profile3 from "../../assets/images/arjun.webp";
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

  const staticProfileImages = [profile1, profile2, profile3];

  const { data: hosts, isLoading, isError } = useGetAllHostQuery({});

  if (isLoading) return <p className="text-center">Loading hosts...</p>;
  if (isError) return <p className="text-center">Failed to load hosts.</p>;

  return (
    <div className="flex gap-10 ml-33 my-4 flex-wrap">
      {hosts?.slice(0, 3).map((host: HostProps, index: number) => (
        <Post
          key={host.hostID}
          firstname={host.firstName || "John"}
          lastname={host.lastName || "Doe"}
          profilePic={host.profilePic || staticProfileImages[index]}
          image={host.image || staticProfileImages[index]}
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
