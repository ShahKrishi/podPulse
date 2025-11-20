import {
  CONTACT_PAGE,
  HOMEPAGE,
  HOST_PAGE,
  PODCAST_PAGE,
} from "../../routes/RoutesNames";
import {
  FaSpotify,
  FaApple,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  // FaPhone,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Podpulse</h2>
          <p className="text-sm mt-2 text-gray-400">
            Your favorite place to discover and stream top podcasts.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Explore</h3>
          <ul className="space-y-2">
            <li>
              <a href={HOMEPAGE} className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href={PODCAST_PAGE} className="hover:text-white">
                Podcast
              </a>
            </li>
            <li>
              <a href={HOST_PAGE} className="hover:text-white">
                Host
              </a>
            </li>
            <li>
              <a href={CONTACT_PAGE} className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Let's Talk</h3>
          <div className="flex space-x-4 mb-4">
            <FaEnvelope size={24} /> <span>info@podpulse.gmail.com</span>
          </div>
          {/* <div className="flex space-x-4 mb-4">
                  <FaPhone size={24} /> <span></span>
                </div> */}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Connect</h3>
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
  );
};

export default Footer;
