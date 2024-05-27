import React from 'react'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import CompanyRegistrationForm from '@/components/Forms/FormCompany'

const CompanyForm = () => {
  return (
    <DefaultLayout>
      <CompanyRegistrationForm />
    </DefaultLayout>
  )
}

export default CompanyForm