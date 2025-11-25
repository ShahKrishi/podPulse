import { useState } from "react";
import DialogueBox from "../../../components/dialogBox/DialogBox";
import Sidebar from "../../../components/sidebar/Sidebar";
import CustomTable from "../../../components/table/Table";
import {
  useGetAllPodcastQuery,
  useSavePodcastMutation,
  useGetByIdPodcastQuery,
  useDeletePodcastMutation,
} from "../../../utils/services/PodcastApi";
import { useFormik } from "formik";
import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import Dropdown from "../../../components/dropdown/Dropdown";
import { useGetHostDropdownQuery } from "../../../utils/services/HostApi";
import { useGetCategoryDropdownQuery } from "../../../utils/services/CategoryApi";

const Podcast: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data, isLoading, isError, error, refetch } = useGetAllPodcastQuery({
    searchText: searchTerm,
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const { data: podcastById } = useGetByIdPodcastQuery(
    { id: editingId },
    { skip: !editingId }
  );

  const handleEdit = (row: any) => {
    setEditingId(row.id);
    setIsDialogueOpen(true);
  };

  const [deletePodcast] = useDeletePodcastMutation();

  const handleDelete = (row: any) => {
    setDeletingId(row.id);
    setShowDeleteConfirm(true);
  };

  const { data: hostDropdown } = useGetHostDropdownQuery({});

  const { data: categoryDropdown } = useGetCategoryDropdownQuery({});

  const columns = [
    { label: "Podcast Title", field: "title" },
    { label: "Description", field: "description" },
    { label: "Host", field: "hostName" },
    { label: "Category", field: "categorieName" },
    {
      label: "",
      field: "actions",
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
          <button onClick={() => handleDelete(row)}>
            <img src={DeleteIcon} alt="delete" className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const [savePodcast] = useSavePodcastMutation();

  const { handleChange, values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      title: podcastById?.title || "",
      description: podcastById?.description || "",
      hostID: podcastById?.hostID || 0,
      categorieId: podcastById?.categoryID || 0,
    },
    // validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          id: editingId || 0,
          title: values.title,
          description: values.description,
          hostId: values.hostID,
          categorieId: values.categorieId,
        };

        await savePodcast(payload).unwrap();

        resetForm();
        setIsDialogueOpen(false);
        setEditingId(null);
        await refetch();
      } catch (err) {
        console.error("Failed to save host:", err);
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
            <h1 className="text-xl font-semibold">Podcast List</h1>
          </div>

          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex justify-between">
              <input
                type="text"
                placeholder="Search by Podcast"
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
                Add new Podcast
              </button>
            </div>

            {isLoading ? (
              <p className="text-gray-500">Loading Podcast...</p>
            ) : isError ? (
              <p className="text-red-500">
                Error:{" "}
                {"message" in error ? error.message : "Failed to fetch podcast"}
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
          title="Add New Podcast"
          closeOnClick={() => setIsDialogueOpen(false)}
          closeBtnLabel="Close"
          confirmBtnLabel="Save"
          confirmOnClick={handleSubmit}
          width={"600px"}
          height={"450px"}
          confirmBtnVariant="contained"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start m-4">
            <label className="font-medium mt-2">Podcast Title</label>
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Enter Podcast Title"
              className="w-full px-3 py-2 border rounded-md"
              required
            />

            <label className="font-medium mt-2">Description</label>
            <input
              type="text"
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="Enter Description"
              className="w-full px-3 py-2 border rounded-md"
              required
            />

            <label className="font-medium mt-2">Host</label>
            <Dropdown
              label="Select Host"
              options={
                hostDropdown?.map((host: any) => ({
                  value: host.hostID,
                  label: host.hostName,
                })) || []
              }
              value={values.hostID}
              onChange={(val) => setFieldValue("hostID", val)}
            />

            <label className="font-medium mt-2">Category</label>
            <Dropdown
              label="Select Category"
              options={
                categoryDropdown?.map((category: any) => ({
                  value: category.id,
                  label: category.name,
                })) || []
              }
              value={values.categorieId}
              onChange={(val) => setFieldValue("categorieId", val)}
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
                await deletePodcast({ id: deletingId }).unwrap();
                setShowDeleteConfirm(false);
                setDeletingId(null);
                await refetch();
              }
            } catch (err) {
              console.error("Failed to delete podcast:", err);
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

export default Podcast;
