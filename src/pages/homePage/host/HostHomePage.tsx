import Footer from "../../../components/footer/Footer";
import NavbarComp from "../../../components/navbar/NavbarComp";
import podcastGirl from "../../../assets/images/podcast-girl.jpg";
import { useGetAllHostQuery } from "../../../utils/services/HostApi";

interface HostProps {
  id: string;
  firstName: string;
  lastName: string;
  profilePic?: string;
  image?: string;
  bio?: string;
}

const HostHomePage = () => {
  const { data: hostData, isLoading, isError } = useGetAllHostQuery({});

  if (isLoading) return <p className="text-center">Loading hosts...</p>;

  if (isError) return <p className="text-center">Failed to load hosts.</p>;

  return (
    <div className="bg-[#fdf6ec] min-h-screen flex flex-col">
      <NavbarComp />

      <main className="flex-1 container mx-auto pt-2 pb-8 px-6">
        <section className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Our Podcast Hosts
          </h1>
          <p className="text-sm text-gray-600">
            Discover the amazing people behind your favorite episodes.
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {hostData.map((host: HostProps) => (
            <div
              key={host.id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition cursor-pointer"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden shadow mb-4">
                <img
                  src={host.image || podcastGirl}
                  alt={host.firstName}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-xl font-semibold text-gray-800">
                {host.firstName}
              </h2>

              <p className="text-gray-600 text-center mt-3 text-sm">
                {host.bio}
              </p>

              <button className="mt-5 px-6 py-2 bg-[#02C7AD] text-black font-semibold rounded-lg hover:bg-[#23877a] transition">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HostHomePage;
