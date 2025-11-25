import { useState } from "react";
import DialogueBox from "../../../components/dialogBox/DialogBox";
import Sidebar from "../../../components/sidebar/Sidebar";
import CustomTable from "../../../components/table/Table";
import {
  useGetAllCategoryQuery,
  useSaveCategoryMutation,
  useGetByIdCategoryQuery,
  useDeleteCategoryMutation,
} from "../../../utils/services/CategoryApi";
import { useFormik } from "formik";
import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";

const EpisodeCategory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data, isLoading, isError, error, refetch } = useGetAllCategoryQuery({
    searchText: searchTerm,
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const { data: categoryById } = useGetByIdCategoryQuery(
    { id: editingId },
    { skip: !editingId }
  );

  const handleEdit = (row: any) => {
    setEditingId(row.id);
    setIsDialogueOpen(true);
  };

  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = (row: any) => {
    setDeletingId(row.id);
    setShowDeleteConfirm(true);
  };

  const columns = [
    { label: "Catgeory Name", field: "name" },
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

  const [saveCategory] = useSaveCategoryMutation();

  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: {
      name: categoryById?.name || "",
    },
    // validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          id: editingId || 0,
          name: values.name,
        };

        await saveCategory(payload).unwrap();

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
            <h1 className="text-xl font-semibold">Category List</h1>
          </div>

          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex justify-between">
              <input
                type="text"
                placeholder="Search by Category"
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
                Add new Category
              </button>
            </div>

            {isLoading ? (
              <p className="text-gray-500">Loading Category...</p>
            ) : isError ? (
              <p className="text-red-500">
                Error:{" "}
                {"message" in error
                  ? error.message
                  : "Failed to fetch category"}
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
          title="Add New Category"
          closeOnClick={() => setIsDialogueOpen(false)}
          closeBtnLabel="Close"
          confirmBtnLabel="Save"
          confirmOnClick={handleSubmit}
          width={"600px"}
          height={"250px"}
          confirmBtnVariant="contained"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start m-4">
            <label className="font-medium mt-2">Category Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Enter Category Name"
              className="w-full px-3 py-2 border rounded-md"
              required
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
                await deleteCategory({ id: deletingId }).unwrap();
                setShowDeleteConfirm(false);
                setDeletingId(null);
                await refetch();
              }
            } catch (err) {
              console.error("Failed to delete category:", err);
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

export default EpisodeCategory;
