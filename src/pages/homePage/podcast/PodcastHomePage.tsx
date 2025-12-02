import Footer from "../../../components/footer/Footer";
import NavbarComp from "../../../components/navbar/NavbarComp";
import podcastGirl from "../../../assets/images/podcast-girl.jpg";
import { useGetAllPodcastQuery } from "../../../utils/services/PodcastApi";
import { useNavigate } from "react-router-dom";
import { PODCAST_DETAILS, PODCAST_PAGE } from "../../../routes/RoutesNames";
import { useState } from "react";
import podcast1 from "../../../assets/images/podcastBharti.png";
import podcast2 from "../../../assets/images/podcastRohit.png";
import podcast3 from "../../../assets/images/podcastArjun.png";

interface PodcastProps {
  id: string | number;
  title: string;
  hostName: string;
  hostLastName: string;
  date: string;
  description: string;
  categorieName: string;
  image: string;
}

const PodcastHomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const staticThumbnailImages = [
    podcast1,
    podcast2,
    podcast3,
    podcast2,
    podcast3,
  ];

  const {
    data: episodes,
    isLoading,
    isError,
  } = useGetAllPodcastQuery({
    searchText: searchTerm,
  });

  if (isLoading) return <div className="text-center">Loading podcasts...</div>;
  if (isError)
    return <div className="text-center">Failed to load podcasts.</div>;

  return (
    <div className="bg-[#fdf6ec] min-h-screen flex flex-col">
      <NavbarComp />
      <section className="pt-4 pb-8 px-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Discover Podcasts
        </h1>
        <p className="mt-3 text-sm text-gray-700 max-w-2xl mx-auto">
          Browse through a curated list of podcasts across various categories.
        </p>
      </section>

      <section className="px-6 md:px-12 mb-10 flex justify-center">
        <input
          type="text"
          placeholder="Search podcasts..."
          onChange={handleSearch}
          value={searchTerm}
          className="w-full max-w-xl bg-white shadow-md border border-gray-200 px-4 py-3 rounded-lg text-gray-700"
        />
      </section>

      <section className="px-6 md:px-12 mb-10">
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            "Technology",
            "Business",
            "Lifestyle",
            "Education",
            "Entertainment",
          ].map((category) => (
            <button
              key={category}
              className="bg-white shadow-sm border border-gray-300 px-4 py-2 rounded-full text-sm hover:bg-gray-100"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 mb-12">
        <h2 className="text-2xl font-bold mb-6">Available Podcasts</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {episodes.map((podcast: PodcastProps, index: number) => (
            <div
              key={podcast.id}
              className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={staticThumbnailImages[index] || podcastGirl}
                alt="Podcast cover"
                className="rounded-lg h-40 w-full object-cover"
              />

              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {podcast.title}
              </h3>

              <p className="text-sm text-gray-900 mt-1 font-semibold">
                <span className="font-semibold">Host: </span>
                {podcast.hostName + " " + podcast.hostLastName}
              </p>

              <p className="text-gray-700 text-sm mt-2 line-clamp-2">
                {podcast.description}
              </p>

              <button
                className="mt-3 text-black font-medium hover:underline"
                onClick={() => {
                  navigate(`${PODCAST_PAGE}/${PODCAST_DETAILS}/${podcast.id}`);
                }}
              >
                View Details →
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PodcastHomePage;
