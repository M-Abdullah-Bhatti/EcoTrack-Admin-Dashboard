import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AvertisementForm from "@/components/Forms/AvertisementForm";

const CompanyForm = () => {
  return (
    <DefaultLayout>
      {/* <CompanyRegistrationForm /> */}
      <AvertisementForm />
    </DefaultLayout>
  );
};

export default CompanyForm;
