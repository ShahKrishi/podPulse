import Footer from "../../../components/footer/Footer";
import NavbarComp from "../../../components/navbar/NavbarComp";
import podcastGirl from "../../../assets/images/podcast-girl.jpg";
import { useParams } from "react-router-dom";
import { useGetPodcastByHostQuery } from "../../../utils/services/PodcastApi";
import { useNavigate } from "react-router-dom";
import { PODCAST_DETAILS, PODCAST_PAGE } from "../../../routes/RoutesNames";

const PodcastDetail = () => {
  const { hostId } = useParams();
  const navigate = useNavigate();

  const {
    data: podcastData,
    isLoading,
    isError,
  } = useGetPodcastByHostQuery({
    id: hostId,
  });

  if (isLoading) return <p className="text-center">Loading hosts...</p>;

  if (isError) return <p className="text-center">Failed to load hosts.</p>;

  return (
    <div className="bg-[#fdf6ec] min-h-screen flex flex-col">
      <NavbarComp />

      <main className="flex-1 container mx-auto px-6 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Meet Your Host
          </h1>
          <p className="text-lg text-gray-600">
            Get to know the voice behind the podcast.
          </p>
        </section>

        <section className="flex flex-col md:flex-row items-center gap-10 mb-20">
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden shadow-lg border">
            <img
              src={podcastGirl}
              alt="Host Image"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              {podcastData.firstName} {podcastData.lastName}
            </h2>
            <p className="text-gray-700 leading-relaxed max-w-xl">
              {podcastData.bio}
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">
            Latest Podcast
          </h3>
          <div className="space-y-6">
            {podcastData.podcastsItems?.length > 0 ? (
              podcastData.podcastsItems.map((episode: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center"
                >
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">
                      {episode.title}
                    </h4>
                    <p className="text-gray-600 mt-2">
                      {episode.description ||
                        "A short description of the podcast goes here."}
                    </p>
                  </div>

                  <button
                    className="mt-4 md:mt-0 px-6 py-2 bg-[#f4a261] text-white rounded-lg hover:bg-[#e78a28] transition"
                    onClick={() => {
                      navigate(
                        `${PODCAST_PAGE}/${PODCAST_DETAILS}/${episode.podcastId}`
                      );
                    }}
                  >
                    Listen
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No episodes available yet.</p>
            )}
          </div>
        </section>

        <section className="text-center mb-20">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Connect with the Host
          </h3>
          <p className="text-gray-600 mb-6">
            Have questions, feedback, or suggestions? Reach out!
          </p>

          <button className="px-8 py-3 bg-[#2a9d8f] text-white rounded-lg hover:bg-[#23877a] transition">
            Contact Host
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PodcastDetail;
