import Episodes from "../../components/Episodes/Episodes";
import Footer from "../../components/footer/Footer";
import Hosts from "../../components/Hosts/Hosts";
import NavbarComp from "../../components/navbar/NavbarComp";
import RecentOutPodcast from "../../components/recentlyOutPodcast/RecentOutPodcast";
import styles from "./HomePage.module.scss";
import podcastBg from "../../assets/images/hero-bg.gif";

const HomePage = () => {
  return (
    <div>
      <div className={styles.container}>
        <NavbarComp />

        <div
          className={styles.heroSection}
          style={{ backgroundImage: `url(${podcastBg})` }}
        >
          <div className={styles.overlay}></div>

          <div className={styles.content}>
            <h1 className="text-5xl font-extrabold tracking-tight">
              Welcome to <span className="text-[#02c7ad]">PodPulse</span>{" "}
              Podcast Agency!
            </h1>

            <p className="text-lg text-gray-800 mt-4 max-w-xl mx-auto">
              Discover top creators, explore trending episodes, and stay tuned
              to the pulse of the podcast world.
            </p>
          </div>
        </div>

        <div className="font-semibold flex justify-center text-xl mt-8">
          Recently Out Episodes
        </div>
        <span className="flex justify-center text-center text-sm text-gray-800">
          Catch up on the latest drops from your favorite creators
        </span>
        <Episodes />

        <div className="font-semibold flex justify-center text-lg">
          Popular Creaters
        </div>
        <span className="flex justify-center text-center text-sm text-gray-800">
          Discover your next favorite creator
        </span>
        <Hosts />

        <div className="font-semibold flex justify-center text-lg">
          Trending Podcasts
        </div>
        <span className="flex justify-center text-center text-sm text-gray-800">
          Tune in to what everyone's listening to
        </span>
        <div className="flex justify-center">
          <RecentOutPodcast />
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
