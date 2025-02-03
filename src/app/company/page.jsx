import React from 'react'
import { headers } from 'next/headers';

const page = () => {
  const headersList = headers();
  const userData = JSON.parse(headersList.get('x-user-data'));
  // console.log("userData",userData)
  return (
    <div>Company View</div>
  )
}

export default page