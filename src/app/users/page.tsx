import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import TableUser from '@/components/Tables/TableUser'
import React from 'react'

const UsersPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='users' />
      <TableUser />
    </DefaultLayout>
  )
}

export default UsersPage