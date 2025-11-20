import {
  FaApple,
  FaEnvelope,
  FaInstagram,
  FaSpotify,
  FaTwitter,
} from "react-icons/fa";
import NavbarComp from "../../../components/navbar/NavbarComp";
import Footer from "../../../components/footer/Footer";

const ContactUsPage = () => {
  return (
    <div className="bg-[#fdf6ec] min-h-screen flex flex-col">
      <NavbarComp />

      <section className="text-center ">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Get in Touch
        </h1>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Have questions, suggestions, or feedback? We'd love to hear from you.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Send Us a Message
          </h2>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Contact Information
            </h2>

            <div className="flex items-center space-x-4 mb-6">
              <FaEnvelope size={26} className="text-gray-800" />
              <span className="text-lg text-gray-700">
                info@podpulse.gmail.com
              </span>
            </div>

            <p className="text-gray-600 mb-8">
              We usually respond within 24–48 hours. For urgent business
              inquiries, reach out via social media.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Follow Us
            </h3>

            <div className="flex space-x-5">
              <a href="#" className="hover:text-gray-900 text-gray-700">
                <FaSpotify size={28} />
              </a>
              <a href="#" className="hover:text-gray-900 text-gray-700">
                <FaApple size={28} />
              </a>
              <a href="#" className="hover:text-gray-900 text-gray-700">
                <FaTwitter size={28} />
              </a>
              <a href="#" className="hover:text-gray-900 text-gray-700">
                <FaInstagram size={28} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUsPage;
