import { useState } from "react";
import CustomTable from "../../../components/table/Table";
import Sidebar from "../../../components/sidebar/Sidebar";
import DialogueBox from "../../../components/dialogBox/DialogBox";
import {
  useGetAllHostQuery,
  useSaveHostMutation,
} from "../../../utils/services/HostApi";
import { useFormik } from "formik";

const HostsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);

  const [saveHost] = useSaveHostMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);

      formik.setFieldValue("profileImage", imageUrl);
      formik.setFieldValue("profileFile", file);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
      profileImage: "",
      profileFile: null as File | null,
    },
    // validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          hostID: 0,
          FirstName: values.firstName,
          LastName: values.lastName,
          Email: values.email,
          Bio: values.bio,
          ProfileImage: values.profileImage,
        };

        console.log(payload);

        await saveHost(payload).unwrap();

        resetForm();
      } catch (err) {
        console.error("Failed to save host:", err);
      }
    },
  });

  const { data, isLoading, isError, error } = useGetAllHostQuery({});

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const columns = [
    { label: "Full Name", field: "fullName" },
    { label: "Email", field: "email", align: "right" },
    { label: "Bio", field: "bio", align: "right" },
    { label: "Profile Image", field: "profileImage", align: "right" },
  ];

  const filteredData = (data || [])
    .map((host: any) => ({
      ...host,
      fullName: `${host.firstName} ${host.lastName}`,
    }))
    .filter((host: any) =>
      `${host.firstName} ${host.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

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
              <CustomTable columns={columns} data={filteredData} />
            )}
          </div>
        </div>
      </div>

      {isDialogueOpen && (
        <DialogueBox
          open={isDialogueOpen}
          onClose={() => setIsDialogueOpen(false)}
          title="Add New Host"
          closeOnClick={() => setIsDialogueOpen(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <label className="font-medium mt-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter First Name"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-600 text-sm">
                {formik.errors.firstName}
              </div>
            )}

            <label className="font-medium mt-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Last Name"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-600 text-sm">
                {formik.errors.lastName}
              </div>
            )}

            <label className="font-medium mt-2">Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Email"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600 text-sm">{formik.errors.email}</div>
            )}

            <label className="font-medium mt-2">Bio</label>
            <textarea
              name="bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              {formik.values.profileImage && (
                <img
                  src={formik.values.profileImage}
                  alt="Profile Preview"
                  className="mt-2 h-24 w-24 object-cover rounded-full border"
                />
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Host"}
            </button>
          </div>

          {error && (
            <div className="text-red-600 mt-2">
              Failed to save host. Please try again.
            </div>
          )}
        </DialogueBox>
      )}
    </>
  );
};

export default HostsList;
