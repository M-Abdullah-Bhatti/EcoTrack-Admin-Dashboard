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

const TableCompany = () => {
  const dispatch = useAppDispatch();
  const companies = useSelector(
    (state: RootState) => state.companies.companies,
  );
  const [showAlert, setShowAlert] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/company/`);
        dispatch(setCompanies(response.data));
        console.log("Company ", companies);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    };
    fetchCompanies();
  }, [dispatch]);

  const handleDelete = (companyId: string) => {
    setShowAlert(true);
    setCompanyToDelete(companyId);
  };

  const confirmDelete = () => {
    if (companyToDelete) {
      dispatch(deleteCompanyAsync(companyToDelete)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setShowToast(true);
        }
        setCompanyToDelete(null);
      });
    }
    setShowAlert(false);
  };

  const cancelDelete = () => {
    setShowAlert(false);
    setCompanyToDelete(null);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Companies
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Delete
            </h5>
          </div>
        </div>

        {companies.map((company: CompanyInfo, key: number) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-3 ${key === companies.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"}`}
            key={company._id}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{company.name}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{company.email}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              {company._id && (
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(company._id!)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showAlert && (
        <CustomAlert
          message="Are you sure you want to delete this company?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      {showToast && (
        <Toast
          message="Company deleted successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default TableCompany;
