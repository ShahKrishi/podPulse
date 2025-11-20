import Footer from "../../../components/footer/Footer";
import NavbarComp from "../../../components/navbar/NavbarComp";
import podcastGirl from "../../../assets/images/podcast-girl.jpg";

const PodcastDetail = () => {
  return (
    <div className="bg-[#fdf6ec] min-h-screen flex flex-col">
      <NavbarComp />

      {/* HERO SECTION */}
      <section className="pt-24 pb-16 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Welcome to the Podcast Hub
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Dive into inspiring conversations, expert insights, and stories that
          shape the world.
        </p>
      </section>

      {/* FEATURED EPISODE */}
      <section className="px-6 md:px-12 mb-16">
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
                The Rise of Creative AI
              </h3>
              <p className="mt-2 text-gray-700">
                Join us as we explore how AI is transforming creativity, design,
                and storytelling across industries.
              </p>
            </div>
            <button className="mt-4 bg-black text-white px-6 py-3 rounded-lg w-max">
              Listen Now
            </button>
          </div>
        </div>
      </section>

      {/* EPISODES GRID */}
      <section className="px-6 md:px-12 mb-20">
        <h2 className="text-3xl font-bold mb-6">Recent Episodes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((episode) => (
            <div key={episode} className="bg-white shadow-md rounded-xl p-4">
              <img
                src={podcastGirl}
                alt="Episode"
                className="rounded-lg h-40 w-full object-cover"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                Episode #{episode}
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                A short description about this episode goes here. Perfect for
                teasers.
              </p>
              <button className="mt-3 text-black font-medium hover:underline">
                Listen →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-black text-white py-12 text-center px-6">
        <h2 className="text-3xl font-bold">Stay Updated</h2>
        <p className="mt-2 text-gray-300">
          Subscribe to get the latest episodes and updates.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-lg w-72 text-black"
          />
          <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold">
            Subscribe
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PodcastDetail;
