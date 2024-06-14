import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableAdvertisement from "@/components/Tables/TableAdvertisement";
// import TableCompany from '@/components/Tables/TableCompany';
import React from "react";

const AdvertisementPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Advertisements" />
      <TableAdvertisement />
      {/* hello */}
    </DefaultLayout>
  );
};

export default AdvertisementPage;
