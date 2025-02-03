
import React from 'react'
import { cookies } from 'next/headers'
import Sidebar from './Sidebar';

const CookieComponent = () => {
  // Get the cookie
  const cookie = cookies().get('hasAcess');
  
  // Parse the cookie value
  const parsedCookie = cookie ? JSON.parse(cookie.value.slice(2)) : [];

  return (
    <Sidebar accessData={parsedCookie} />
  )
}

export default CookieComponent;
