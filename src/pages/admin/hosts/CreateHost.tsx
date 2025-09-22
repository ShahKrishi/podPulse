import React from "react";
import { useFormik } from "formik";
// import * as Yup from "yup";
import { useSaveHostMutation } from "../../../utils/services/HostApi";

interface CreateHostProps {
  onClose?: () => void;
}

// const validationSchema = Yup.object({
//   firstName: Yup.string().required("First Name is required"),
//   lastName: Yup.string().required("Last Name is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   bio: Yup.string(),
// });

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const CreateHost: React.FC<CreateHostProps> = ({ onClose }) => {
  const [saveHost, { isLoading, error }] = useSaveHostMutation();

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
        let profileImageBase64 = values.profileImage;

        if (values.profileFile) {
          profileImageBase64 = await fileToBase64(values.profileFile);
        }

        const payload = {
          hostID: 0,
          FirstName: values.firstName,
          LastName: values.lastName,
          Email: values.email,
          Bio: values.bio,
          ProfileImage: profileImageBase64,
        };

        console.log(payload);

        await saveHost(payload).unwrap();

        resetForm();
        if (onClose) onClose();
      } catch (err) {
        console.error("Failed to save host:", err);
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);

      formik.setFieldValue("profileImage", imageUrl);
      formik.setFieldValue("profileFile", file);
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6 max-w-2xl mx-auto"
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
          <div className="text-red-600 text-sm">{formik.errors.firstName}</div>
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
          <div className="text-red-600 text-sm">{formik.errors.lastName}</div>
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
    </form>
  );
};

export default CreateHost;
