import Sidebar from "../../components/sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-sm rounded-lg p-5 border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
            <span className="text-gray-500 text-sm font-medium">
              Total Users
            </span>
            <span className="text-black text-2xl font-semibold mt-2">50</span>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-5 border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
            <span className="text-gray-500 text-sm font-medium">
              Total Category
            </span>
            <span className="text-black text-2xl font-semibold mt-2">20</span>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-5 border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
            <span className="text-gray-500 text-sm font-medium">
              Total Podcast
            </span>
            <span className="text-black text-2xl font-semibold mt-2">24</span>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-5 border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
            <span className="text-gray-500 text-sm font-medium">
              Total Episodes
            </span>
            <span className="text-black text-2xl font-semibold mt-2">40</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
