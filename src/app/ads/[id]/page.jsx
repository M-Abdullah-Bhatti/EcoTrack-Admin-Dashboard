import AdvertisementDetails from "@/components/AdvertisementDetails/page";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import AdvertisementDetails from "@/components/AdvertisementDetails";
// import TableAdvertisement from "@/components/Tables/TableAdvertisement";

// import TableCompany from '@/components/Tables/TableCompany';
import React from "react";

const AdvertisementPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Advertisements" />
      <AdvertisementDetails />
    </DefaultLayout>
  );
};

export default AdvertisementPage;
