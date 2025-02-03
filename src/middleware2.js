import { NextResponse } from 'next/server';
import { cookies } from "next/headers";
import { authenticatedData } from "./utils/authenticatedData"; // Adjust the import path as needed
import { checkPermission } from "./utils/checkPermission1";
import { getDepartmentName, getRoleName } from "./utils/helper";
const departmentRoleRedirections = {
    "Sales Department": {
      "Sales Manager": "/sales-dashboard/manager",
      "Sales Executive": "/sales-dashboard/executive",
    },
  };
export async function middleware(req) {
const { pathname } = req.nextUrl;

const token = cookies(req).get("userSession");
if (!token) {
    if (pathname !== '/') {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
    
  }
  const user = await authenticatedData(token.value);
    const hasAccess = checkPermission(user, pathname);
    console.log(hasAccess)
    const departmentName = getDepartmentName(user);
    const roleName = getRoleName(user);

    const roleRedirectUrl =
      departmentRoleRedirections[departmentName]?.[roleName];
      //console.log('roleRedirectUrl',roleRedirectUrl)

    
      //console.log(pathname);
      if (roleRedirectUrl) {
        return NextResponse.redirect(new URL(roleRedirectUrl, req.url));
      }
    //   if (pathname==='/' && token) {
    //     //console.log('roleRedirectUrl',roleRedirectUrl)
        
    //     return NextResponse.redirect(new URL(roleRedirectUrl, req.url));

    //     //NextResponse.next().cookies.set('roleRedirectUrl', JSON.stringify(roleRedirectUrl), { httpOnly: true })

    //     }

    //console.log("Data from API:", hasAccess);
    //console.log(pathname);

    // if (pathname === '/') {
    //   // Perform logout operations if necessary, e.g., clear cookies
    //   // Clear a cookie named "auth" as an example
    //   const response = NextResponse.redirect('/');
    //   //response.cookies.delete('auth');
    //   return response;
    // }

    if (!hasAccess) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }


  

  // Add user data to request headers
  const response = NextResponse.next();
  //response.headers.set('x-user-data', JSON.stringify(roleRedirectUrl));

  return response;
}

export const config = {
  matcher: ['/company', '/profile', '/sales-dashboard/manager'], // Protect these routes
};