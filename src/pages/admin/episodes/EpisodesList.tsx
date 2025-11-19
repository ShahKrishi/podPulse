import { useState } from "react";
import DialogueBox from "../../../components/dialogBox/DialogBox";
import Sidebar from "../../../components/sidebar/Sidebar";
import CustomTable from "../../../components/table/Table";
import {
  useGetAllEpisodeQuery,
  useSaveEpisodeMutation,
  useGetByIdEpisodeQuery,
  useDeleteEpisodeMutation,
} from "../../../utils/services/EpisodeApi";
import { useGetPodcastDropdownQuery } from "../../../utils/services/PodcastApi";
import { formatDate } from "../../../utils/common";
import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import { useFormik } from "formik";
import Dropdown from "../../../components/dropdown/Dropdown";
import { secondsToTimeSpan } from "../../../utils/common";

const EpisodesList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data, isLoading, isError, error, refetch } = useGetAllEpisodeQuery(
    {}
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const { data: podcastDropdownData } = useGetPodcastDropdownQuery({});

  const { data: episodeById } = useGetByIdEpisodeQuery(
    { id: editingId },
    { skip: !editingId }
  );

  const handleEdit = (row: any) => {
    setEditingId(row.id);
    setIsDialogueOpen(true);
  };

  const [deleteUser, { isLoading: isDeleting }] = useDeleteEpisodeMutation();

  const handleDelete = (row: any) => {
    setDeletingId(row.id);
    setShowDeleteConfirm(true);
  };

  const columns = [
    { label: "Title", field: "title" },
    { label: "Description", field: "description", align: "right" },
    { label: "Duration", field: "duration", align: "right" },
    {
      label: "Release Date",
      field: "releaseDate",
      render: (row: any) => (
        <span>{row.releaseDate ? formatDate(row.releaseDate) : "—"}</span>
      ),
    },
    {
      label: "",
      field: "",
      align: "right",
      render: (row: any) => (
        <div className="flex gap-8">
          <button
            onClick={() => {
              setIsDialogueOpen(true);
              handleEdit(row);
            }}
          >
            <img src={EditIcon} alt="edit" className="w-4 h-4" />
          </button>
          <button onClick={() => handleDelete(row)} disabled={isDeleting}>
            <img src={DeleteIcon} alt="delete" className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const [saveUser] = useSaveEpisodeMutation();

  const { handleChange, values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      podcastId: episodeById?.podcasteId || "",
      title: episodeById?.title || "",
      description: episodeById?.description || "",
      file: null as File | null,
      url: "",
      duration: 0,
    },
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        let fileUrl = values.url;
        let fileDuration = values.duration;

        if (values.file) {
          const fileName = values.file.name;

          fileUrl = `/audioFiles/${fileName}`;

          fileDuration = await new Promise<number>((resolve) => {
            const audio = document.createElement("audio");
            audio.src = URL.createObjectURL(values.file!);

            audio.onloadedmetadata = () => {
              resolve(audio.duration);
            };
          });
        }
        const payload = {
          id: editingId || 0,
          title: values.title,
          description: values.description,
          url: fileUrl,
          duration: secondsToTimeSpan(fileDuration),
          podcastId: values.podcastId,
        };

        console.log("payload of episode", payload);

        await saveUser(payload).unwrap();
        resetForm();
        setIsDialogueOpen(false);
        setEditingId(null);
        await refetch();
      } catch (err) {
        console.error("Failed to save episode:", err);
      }
    },
  });

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
          closeBtnLabel="Close"
          confirmBtnLabel="Save"
          confirmOnClick={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start p-2">
            <label className="font-medium mt-2">Podcast</label>
            <Dropdown
              label="Select Podcast"
              options={
                podcastDropdownData?.map((host: any) => ({
                  value: host.id,
                  label: host.title,
                })) || []
              }
              value={values.podcastId}
              onChange={(val) => setFieldValue("podcastId", val)}
            />

            <label className="font-medium mt-2">Title</label>
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Enter Title"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
            <label className="font-medium mt-2"> Description</label>
            <input
              type="text"
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="Enter Description"
              className="w-full px-3 py-2 border rounded-md"
              required
            />

            <label className="font-medium mt-2">Audio File (MP3)</label>
            <input
              type="file"
              name="audioFile"
              accept="audio/mp3, audio/mpeg"
              onChange={(e) =>
                setFieldValue("file", e.target.files?.[0] || null)
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </DialogueBox>
      )}

      {showDeleteConfirm && (
        <DialogueBox
          open={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          title="Confirm Deletion"
          closeOnClick={() => setShowDeleteConfirm(false)}
          closeBtnLabel="Cancel"
          confirmBtnLabel="Delete"
          confirmOnClick={async () => {
            try {
              if (deletingId) {
                await deleteUser({ id: deletingId }).unwrap();
                setShowDeleteConfirm(false);
                setDeletingId(null);
                await refetch();
              }
            } catch (err) {
              console.error("Failed to delete user:", err);
            }
          }}
          confirmBtnVariant="contained"
          width="500px"
          height="250px"
        >
          <div className="p-4 text-md font-bold text-gray-700">
            Are you sure you want to delete this record?
          </div>
        </DialogueBox>
      )}
    </>
  );
};

export default EpisodesList;
