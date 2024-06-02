import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableVoucher from "@/components/Tables/TableVoucher";
import React from "react";

const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="vouchers" />
      <TableVoucher />
    </DefaultLayout>
  );
};

export default page;
