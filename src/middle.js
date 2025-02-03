import { NextResponse } from "next/server";

export const middleware = (req) => {
  // Retrieve the token from cookies
  const token = req.cookies.get("userSession")?.value;

  // If the token is missing, redirect to the home page
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If the token exists, redirect to the employee dashboard
  if (req.nextUrl.pathname !== "/employee/dashboard") {
    return NextResponse.redirect(new URL("/employee/dashboard", req.url));
  }

  // Allow the request to proceed if no redirection is required
  return NextResponse.next();
};
