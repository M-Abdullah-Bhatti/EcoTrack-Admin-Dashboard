// components/Layouts/NoSidebarLayout.tsx
import React from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const NoSidebarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-boxdark">
      <div className="p-6.5">
        <Breadcrumb pageName="Register Company" />
        {children}
      </div>
    </div>
  );
};

export default NoSidebarLayout;
