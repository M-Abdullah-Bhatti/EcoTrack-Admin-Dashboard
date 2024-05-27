import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import TableCompany from '@/components/Tables/TableCompany';
import React from 'react';

const CompaniesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='companies' />
      <TableCompany />
    </DefaultLayout>
  );
};

export default CompaniesPage;
