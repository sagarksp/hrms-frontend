
import React from 'react'
import { cookies } from 'next/headers'
import Layout from '@/layouts/hrms/Layout';


const CookieComponent = () => {
  // Get the cookie
  const cookie = cookies().get('hasAcess');
  console.log('cookie',cookie)
  // Parse the cookie value
  const parsedCookie = cookie ? JSON.parse(cookie.value.slice(2)) : [];
     console.log('parsedCookie',parsedCookie)
  return (
    <Layout accessData={parsedCookie} />
    
  )
}

export default CookieComponent;
