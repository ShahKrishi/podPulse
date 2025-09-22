import { useState } from "react";
import DialogueBox from "../../../components/dialogBox/DialogBox";
import Sidebar from "../../../components/sidebar/Sidebar";
import CustomTable from "../../../components/table/Table";
import {
  useGetAllCategoryQuery,
  useSaveCategoryMutation,
} from "../../../utils/services/Category";
import { useFormik } from "formik";
import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";

const EpisodeCategory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);

  const { data, isLoading, isError, error, refetch } = useGetAllCategoryQuery(
    {}
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (row: any) => {
    console.log("Edit row:", row);
  };

  const handleDelete = (row: any) => {
    console.log("Delete row:", row);
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

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    // validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          name: values.name,
        };

        console.log(payload);

        await saveCategory(payload).unwrap();

        resetForm();
        setIsDialogueOpen(false);
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
          confirmOnClick={formik.handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start m-4">
            <label className="font-medium mt-2">Category Name</label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder="Enter Category Name"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
        </DialogueBox>
      )}
    </>
  );
};

export default EpisodeCategory;
