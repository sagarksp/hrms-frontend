'use client'
import EmployeeWizard from '@/app/(webadmin)/user-management/employee-view/page';
import Layout from '../components/layout/Layout';
import React from 'react'



const page = () => {
  return (
    <Layout >
      <div style={{padding: "50px"}}>
           <EmployeeWizard />
      </div>
 </Layout>
  )
}

export default page