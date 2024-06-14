"use client";

import React, { useState } from "react";
import { useAppDispatch } from "../../lib/store";
import { registerCompanyAsync } from "../../lib/features/companySlice";
import Toast from "../Toast/Toast";
import { uploadImageToFirebase } from "@/utils/uploadImage";
import { useAppSelector } from "@/lib/hooks";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import RequestLoader from "../RequestLoader";

const AvertisementForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const user = useAppSelector((state) => state.auth.currentUser);
  //   console.log("user: ", user);
  const [formData, setFormData] = useState({
    description: "",
  });

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoader(true);
      // Upload the image first if it exists
      const imageUrl = file ? await uploadImageToFirebase(file) : null;

      console.log("imageUrl: ", imageUrl);

      // Create a complete form data object, including the image URL if available
      const completeFormData = {
        user: user?._id,
        isTypeAd: true,
        postDescription: formData.description,
        image: imageUrl, // replace the local file object with the URL from Firebase
      };

      console.log("completeFormData: ", completeFormData);

      const response = await axios.post(
        `${baseUrl}/api/posts/postAd`,
        completeFormData,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );

      if (response.data) {
        setToastMessage("Advertisement Created successfully!");
        setShowToast(true);
        setFormData({ description: "" });
        setFile(null);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);

      setToastMessage("Failed to create advertisement");
      setShowToast(true);
      console.error("Failed to create advertisement: ", error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Create Custom Ad
        </h3>
      </div>
      <form onSubmit={handleSubmit} className="p-6.5">
        <div className="mb-6">
          <label className="block text-sm font-medium text-black dark:text-white">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            placeholder="Enter your voucher description"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          ></textarea>
        </div>

        {/* <!-- File upload --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Post Image
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Attach file
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
        >
          {loader ? <RequestLoader /> : "Create Voucher"}
        </button>
      </form>
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
};

export default AvertisementForm;
