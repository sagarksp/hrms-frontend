import { NextResponse } from "next/server";
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

export const middleware = async (req) => {
  const { pathname } = req.nextUrl;
  console.log(pathname)
  // if(pathname==='/')
  //   {
  //     return NextResponse.next();
  //   }
  const token = cookies(req).get("userSession");

  // console.log("Token from cookies:", token);

  // if (!token && pathname!='/') {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }
  if (!token) {
    if (pathname !== '/') {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
    
  }
  // if (pathname==='/' && token) {
  //   return NextResponse.redirect(new URL('/company', req.url));
  // }

  try {
    const user = await authenticatedData(token.value);
    const hasAccess = checkPermission(user, pathname);
    const departmentName = getDepartmentName(user);
    const roleName = getRoleName(user);

    const roleRedirectUrl =
      departmentRoleRedirections[departmentName]?.[roleName];
      //console.log('roleRedirectUrl',roleRedirectUrl)

    
      //console.log(pathname);
      // if (roleRedirectUrl) {
      //   return NextResponse.redirect(new URL(roleRedirectUrl, req.url));
      // }
      if (pathname==='/' && token) {
        //console.log('roleRedirectUrl',roleRedirectUrl)
        
        return NextResponse.redirect(new URL(roleRedirectUrl, req.url));

        //NextResponse.next().cookies.set('roleRedirectUrl', JSON.stringify(roleRedirectUrl), { httpOnly: true })

        }

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

    // Extract resources from the API response
    //const permissions = data.data.role.permissions;
    //const resources = permissions.map(permission => permission.resources);

    //console.log("Resources:", resources);

    const response = NextResponse.next();
        response.headers.set('x-user-data', "ashu" );
        return response;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
};

export const config = {
  matcher: [
    '/',
    "/company/:path*",
    "/company/create/:path*",
    // "/sales-dashboard/manager/:path*",
    // "/sales-dashboard/executive/:path*",
  ], // Adjust the matcher pattern as needed
};
