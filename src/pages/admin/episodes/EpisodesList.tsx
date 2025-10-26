import { useState } from "react";
import DialogueBox from "../../../components/dialogBox/DialogBox";
import Sidebar from "../../../components/sidebar/Sidebar";
import CustomTable from "../../../components/table/Table";
import { useGetAllEpisodeQuery } from "../../../utils/services/EpisodeApi";
import { formatDate } from "../../../utils/common";

const EpisodesList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);

  const { data, isLoading, isError, error } = useGetAllEpisodeQuery({});

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const columns = [
    { label: "Title", field: "title" },
    { label: "Description", field: "description", align: "right" },
    { label: "Duration", field: "duration", align: "right" },
    {
      label: "Release Date",
      field: "releaseDate",
      align: "right",
      render: (row: any) => formatDate(row.releaseDate),
    },
  ];

  return (
    <>
      <div className="flex">
        <div className="w-75">
          <Sidebar />
        </div>
        <div className="p-4 w-full">
          <div className="my-4">
            <h1 className="text-xl font-semibold">Episode List</h1>
          </div>

          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex justify-between">
              <input
                type="text"
                placeholder="Search by Episode Name"
                value={searchTerm}
                onChange={handleSearch}
                className="p-2 my-6 border border-gray-300 rounded-lg"
              />
              <button
                onClick={() => {
                  setIsDialogueOpen(true);
                }}
                className="p-2 my-6 rounded-md border border-black-400 bg-blue-400 font-semibold"
              >
                Add new Episode
              </button>
            </div>

            {isLoading ? (
              <p className="text-gray-500">Loading Episode...</p>
            ) : isError ? (
              <p className="text-red-500">
                Error:{" "}
                {"message" in error ? error.message : "Failed to fetch episode"}
              </p>
            ) : (
              <CustomTable columns={columns} data={data} />
            )}
          </div>
        </div>
      </div>

      {isDialogueOpen && (
        <DialogueBox
          open={isDialogueOpen}
          onClose={() => setIsDialogueOpen(false)}
          title="Add New Episode"
          closeOnClick={() => setIsDialogueOpen(false)}
        >
          {/* <CreateHost onClose={() => setIsDialogueOpen(false)} /> */}
        </DialogueBox>
      )}
    </>
  );
};

export default EpisodesList;
