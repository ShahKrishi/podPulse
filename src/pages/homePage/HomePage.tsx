import Episodes from "../../components/Episodes/Episodes";
import Hosts from "../../components/Hosts/Hosts";
import NavbarComp from "../../components/navbar/NavbarComp";
import RecentOutEpisodes from "../../components/recentOutEpisodes/RecentOutEpisodes";
import styles from "./HomePage.module.scss";
import {
  FaSpotify,
  FaApple,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  // FaPhone,
} from "react-icons/fa";

const HomePage = () => {
  return (
    <div>
      <div className={styles.container}>
        <NavbarComp />

        <div className="font-semibold flex justify-center text-xl">
          Trending Podcasts
        </div>
        <span className="flex justify-center text-center text-sm text-gray-800">
          Tune in to what everyone's listening to
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
          Recently Out Episodes
        </div>
        <span className="flex justify-center text-center text-sm text-gray-800">
          Catch up on the latest drops from your favorite creators
        </span>
        <div className="flex justify-center">
          <RecentOutEpisodes />
        </div>

        <div>
          <footer className="bg-gray-900 text-gray-200 py-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-white">Podpulse</h2>
                <p className="text-sm mt-2 text-gray-400">
                  Your favorite place to discover and stream top podcasts.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Explore
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-white">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Episodes
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Hosts
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Let's Talk
                </h3>
                <div className="flex space-x-4 mb-4">
                  <FaEnvelope size={24} /> <span>info@Podpulse.gmail.com</span>
                </div>
                {/* <div className="flex space-x-4 mb-4">
                  <FaPhone size={24} /> <span></span>
                </div> */}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Connect
                </h3>
                <div className="flex space-x-4 mb-4">
                  <a href="#" className="hover:text-white">
                    <FaSpotify size={24} />
                  </a>
                  <a href="#" className="hover:text-white">
                    <FaApple size={24} />
                  </a>
                  <a href="#" className="hover:text-white">
                    <FaTwitter size={24} />
                  </a>
                  <a href="#" className="hover:text-white">
                    <FaInstagram size={24} />
                  </a>
                </div>
                <p className="text-sm text-gray-400">
                  © {new Date().getFullYear()} Podpulse. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
