"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../lib/store";
import {
  setCompanies,
  deleteCompanyAsync,
  CompanyInfo,
} from "../../lib/features/companySlice";
import axios from "axios";
import CustomAlert from "../Alert/Alert";
import Toast from "../Toast/Toast";
import baseUrl from "@/utils/baseUrl";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";

const TableAdvertisement = () => {
  const [refetch, setRefetch] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [voucherToDisable, setVoucherToDisable] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const user = useAppSelector((state) => state.auth.currentUser);

  const router = useRouter();

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        // const response = await axios.get(`${baseUrl}/api/voucher/allVouchers`);

        const response = await axios.get(
          `${baseUrl}/api/posts/advertisement?userId=${user?._id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          },
        );

        console.log("response: ", response);
        setVouchers(response.data);
      } catch (error) {
        console.error("Failed to fetch vouchers:", error);
      }
    };
    fetchVouchers();
  }, [refetch]);

  const handleDisable = (voucherId: string) => {
    setShowAlert(true);
    setVoucherToDisable(voucherId);
  };

  const handleNavigate = (voucherId: string) => {
    router.push(`/ads/${voucherId}`);
  };

  const confirmDisable = async () => {
    if (voucherToDisable) {
      const response = await axios.delete(
        `${baseUrl}/api/posts/${voucherToDisable}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );

      console.log("resp:   ", response);
      setRefetch(!refetch);
      setShowToast(true);

      setVoucherToDisable(null);
    }
    setShowAlert(false);
  };

  const cancelDisable = () => {
    setShowAlert(false);
    setVoucherToDisable(null);
  };

  const showAvailibility = (value: Boolean) => {
    if (!value) {
      return "Yes";
    } else {
      return "No";
    }
  };

  const showDescription = (data: string) => {
    if (data.length < 100) {
      return data;
    } else {
      return data.slice(0, 100) + "...";
    }
  };
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        My Advertisement
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Description
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Image
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {vouchers.map((item: any, key: number) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-3 ${key === vouchers.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"}`}
            key={item._id}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {/* {item?.postDescription?.slice(0, 100)} */}
                {showDescription(item?.postDescription)}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <a
                href={item?.image}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {item?.image?.slice(0, 80)}
              </a>
            </div>

            <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5">
              {item._id && (
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDisable(item._id!)}
                >
                  Delete
                </button>
              )}
              {item._id && (
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleNavigate(item._id!)}
                >
                  View
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showAlert && (
        <CustomAlert
          message="Are you sure you want to disable this voucher?"
          onConfirm={confirmDisable}
          onCancel={cancelDisable}
        />
      )}

      {showToast && (
        <Toast
          message="Advertisement Deleted successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default TableAdvertisement;
