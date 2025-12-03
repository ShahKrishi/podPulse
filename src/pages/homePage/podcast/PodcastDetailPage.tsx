import { useRef, useState } from "react";
import Footer from "../../../components/footer/Footer";
import NavbarComp from "../../../components/navbar/NavbarComp";
import podcastGirl from "../../../assets/images/podcast-girl.jpg";
import { useParams } from "react-router-dom";
import { useGetEpisodesByPodcastQuery } from "../../../utils/services/EpisodeApi";
import Playing from "../../../components/player/Player";
// import Dhun from "../../../assets/audio/Dhun Paryushan.mp3";
import RiseFromWarrior from "../../../assets/audio/rise of warrior.mp3";
import heartInHarmory from "../../../assets/audio/heart in harmony.mp3";
import funnyBeginning from "../../../assets/audio/funnyBeginning.mp3";
import slientWitness from "../../../assets/audio/slient witness.mp3";
import curiousMind from "../../../assets/audio/curious minds.mp3";

interface EpisodeProps {
  id: number;
  episodeTitle: string;
  episodeDescription: string;
  categoryName: string;
}

const PodcastDetail = () => {
  const { podcastId } = useParams();
  const numericPodcastId = Number(podcastId);

  const getAudioByPodcastId = () => {
    if (numericPodcastId === 1) return funnyBeginning;
    if (numericPodcastId === 2) return RiseFromWarrior;
    if (numericPodcastId === 3) return heartInHarmory;
    if (numericPodcastId === 4) return slientWitness;
    return curiousMind;
  };

  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentEpisodeTitle, setCurrentEpisodeTitle] = useState<string>("");

  const handleListen = (audioUrl: string, episodeTitle: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (currentAudio === audioUrl) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play();
      setIsPlaying(true);
    }

    setCurrentAudio(audioUrl);
    setCurrentEpisodeTitle(episodeTitle);
  };

  const {
    data: episodeData,
    isLoading,
    isError,
  } = useGetEpisodesByPodcastQuery({
    id: podcastId,
  });

  if (isLoading) return <p className="text-center">Loading podcast...</p>;

  if (isError || !episodeData)
    return <p className="text-center">Failed to load podcast.</p>;

  return (
    <div className="bg-[#fdf6ec] min-h-screen flex flex-col">
      <NavbarComp />

      <section className="text-center px-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {episodeData.podcastTitle}
        </h1>
        <p className="mt-4 text-sm text-gray-700 max-w-2xl mx-auto">
          {episodeData.podcastDescription}
        </p>
      </section>

      {episodeData.episodeItems?.length > 0 && (
        <section className="px-6 md:px-12 mb-8 mt-4">
          <div className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row gap-6">
            <img
              src={podcastGirl}
              alt="Featured episode"
              className="rounded-lg w-full md:w-1/3 h-64 object-cover"
            />
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">🌟 Featured Episode</h2>

                <h3 className="text-xl font-semibold text-gray-900">
                  {episodeData?.episodeItems[0]?.episodeTitle}
                </h3>

                <p className="mt-2 text-gray-700">
                  {episodeData?.episodeItems[0]?.episodeDescription}
                </p>

                <p className="mt-1 text-sm text-gray-500 italic">
                  Category: {episodeData?.episodeItems[0]?.categoryName}
                </p>
              </div>
              <button
                className="mt-4 bg-black text-white px-6 py-3 rounded-lg w-max"
                onClick={() =>
                  handleListen(
                    getAudioByPodcastId(),
                    episodeData.episodeItems[0].episodeTitle
                  )
                }
              >
                Listen Now
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="px-6 md:px-12 mb-8">
        <h2 className="text-3xl font-bold mb-6">Recent Episodes</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {episodeData.episodeItems?.map(
            (episode: EpisodeProps, index: number) => (
              <div key={index} className="bg-white shadow-md rounded-xl p-4">
                <img
                  src={podcastGirl}
                  alt="Episode"
                  className="rounded-lg h-40 w-full object-cover"
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-800">
                  {episode.episodeTitle}
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  {episode.episodeDescription}
                </p>

                <p className="text-gray-500 text-xs mt-1">
                  Category: {episode.categoryName}
                </p>

                <button
                  className="mt-3 text-black font-medium hover:underline"
                  onClick={() =>
                    handleListen(getAudioByPodcastId(), episode.episodeTitle)
                  }
                >
                  Listen →
                </button>
              </div>
            )
          )}
        </div>
      </section>

      <section className="bg-black text-white py-12 text-center px-6">
        <h2 className="text-3xl font-bold">Stay Updated</h2>
        <p className="mt-2 text-gray-300">
          Subscribe to get the latest episodes and updates.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-lg w-72 border"
          />
          <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold">
            Subscribe
          </button>
        </div>
      </section>
      <Footer />
      {currentAudio && (
        <div className="fixed bottom-0 left-0 w-full z-50">
          <Playing
            title={currentEpisodeTitle}
            username=""
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

export default PodcastDetail;
