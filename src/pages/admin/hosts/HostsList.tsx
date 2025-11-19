import { useState } from "react";
import CustomTable from "../../../components/table/Table";
import Sidebar from "../../../components/sidebar/Sidebar";
import DialogueBox from "../../../components/dialogBox/DialogBox";
import {
  useGetAllHostQuery,
  useSaveHostMutation,
  useGetHostByIDQuery,
  useDeleteHostMutation,
} from "../../../utils/services/HostApi";
import { useFormik } from "formik";
import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";

const HostsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data, isLoading, isError, error, refetch } = useGetAllHostQuery({});

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setFieldValue("profileImage", imageUrl);
      setFieldValue("profileFile", file);
    }
  };

  console.log("editing id", editingId);
  const { data: hostById } = useGetHostByIDQuery(
    { id: editingId },
    { skip: !editingId }
  );

  const handleEdit = (row: any) => {
    setEditingId(row.hostID);
    setIsDialogueOpen(true);
  };

  const [deleteHost] = useDeleteHostMutation();

  const handleDelete = (row: any) => {
    setDeletingId(row.hostID);
    setShowDeleteConfirm(true);
  };

  const columns = [
    { label: "Name", field: "firstName" },
    { label: "Email", field: "email", align: "right" },
    { label: "Bio", field: "bio", align: "right" },
    { label: "Profile Image", field: "profileImage", align: "right" },
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

  const [saveHost] = useSaveHostMutation();

  const { values, setFieldValue, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: hostById?.firstName || "",
      lastName: hostById?.lastName || "",
      email: hostById?.email || "",
      bio: hostById?.bio || "",
      profileImage: "",
      profileFile: null as File | null,
    },
    // validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          hostID: editingId || 0,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          bio: values.bio,
          profileImage: values.profileFile?.name,
        };

        await saveHost(payload).unwrap();

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
            <h1 className="text-xl font-semibold">Hosts List</h1>
          </div>

          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex justify-between">
              <input
                type="text"
                placeholder="Search by Host Name"
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
                Add new Host
              </button>
            </div>

            {isLoading ? (
              <p className="text-gray-500">Loading hosts...</p>
            ) : isError ? (
              <p className="text-red-500">
                Error:{" "}
                {"message" in error ? error.message : "Failed to fetch hosts"}
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
          title={editingId ? "Edit Host" : "Add New Host"}
          closeBtnLabel="Close"
          confirmBtnLabel="Save"
          confirmOnClick={handleSubmit}
          closeOnClick={() => setIsDialogueOpen(false)}
          width={"700px"}
          height={"700px"}
          confirmBtnVariant="contained"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start p-2">
            <label className="font-medium mt-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              // onBlur={handleBlur}
              placeholder="Enter First Name"
              className="w-full px-3 py-2 border rounded-md"
              required
            />

            <label className="font-medium mt-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              // onBlur={handleBlur}
              placeholder="Enter Last Name"
              className="w-full px-3 py-2 border rounded-md"
              required
            />

            <label className="font-medium mt-2">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              // onBlur={handleBlur}
              placeholder="Enter Email"
              className="w-full px-3 py-2 border rounded-md"
              required
            />

            <label className="font-medium mt-2">Bio</label>
            <textarea
              name="bio"
              value={values.bio}
              onChange={handleChange}
              // onBlur={handleBlur}
              placeholder="Enter Bio"
              className="w-full px-3 py-2 border rounded-md"
              rows={4}
            ></textarea>

            <label className="font-medium mt-2">Profile Image</label>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              {values.profileImage && (
                <img
                  src={values.profileImage}
                  alt="Profile Preview"
                  className="mt-2 h-24 w-24 object-cover rounded-full border"
                />
              )}
            </div>
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
                await deleteHost({ id: deletingId }).unwrap();
                setShowDeleteConfirm(false);
                setDeletingId(null);
                await refetch();
              }
            } catch (err) {
              console.error("Failed to delete host:", err);
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

export default HostsList;
