import Episodes from "../../components/Episodes/Episodes";
import Footer from "../../components/footer/Footer";
import Hosts from "../../components/Hosts/Hosts";
import NavbarComp from "../../components/navbar/NavbarComp";
import RecentOutPodcast from "../../components/recentlyOutPodcast/RecentOutPodcast";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div>
      <div className={styles.container}>
        <NavbarComp />

        <div className="font-semibold flex justify-center text-xl">
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
