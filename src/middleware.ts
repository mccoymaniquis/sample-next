/* eslint-disable node/no-process-env */
import type { NextRequest } from "next/server";

import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

import type { Decoded } from "@/types";

const protectedRoutes = [
  "/change-password",
  "/supply",
  "/demand",
  "/reports",
  "/charts",
  "/reports/supply-demand-forecast",
  "/reports/weekly-deployment",
  "/change-current-password",
];

const publicRoutes = [
  "/",
  "/login",
  "/reset-password",
  "/forgot-password",
];

export function middleware(request: NextRequest): NextResponse<unknown> {
  // Log cookies and request URL for debugging
  const cookieName = process.env.NEXT_PUBLIC_COOKIE_NAME || "accessToken";
  const token = request.cookies.get(cookieName)?.value;
  const urlToken = request.nextUrl.searchParams.get("token");
  const errorParam = request.nextUrl.searchParams.get("error");
  if (errorParam) {
    const cleanUrl = new URL(request.nextUrl.pathname, request.url);
    const response = NextResponse.redirect(cleanUrl);
    // Optional: you can store the error in a cookie or header to show in the UI
    response.cookies.set("authError", errorParam, {
      path: "/",
    });
    return response;
  }
  if (!token && urlToken && request.nextUrl.pathname !== "/reset-password") {
    const cleanUrl = new URL(request.nextUrl.pathname, request.url);
    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set(cookieName, urlToken, {
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NEXT_NODE_ENV === "production",
      // this will be change to NEXT_NODE_ENV
      path: "/",
    });
    return response;
  }
  if (!token && protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (!token) {
    return NextResponse.next();
  }

  try {
    const jwtToDecode = token ?? urlToken; // fallback if for some reason cookie is missing
    const decoded = jwtDecode<Decoded>(jwtToDecode);
    const currentTime = new Date().getTime() / 1000;
    const isNewPassword = decoded?.isUserChangedPassword;

    // when userChangePassword in the users table is equals to 0
    if (!isNewPassword && request.nextUrl.pathname !== "/change-password") {
      console.warn("Redirecting to /change-password because user needs to change password");
      return NextResponse.redirect(new URL("/change-password", request.url));
    }

    // when userChangePassword in the users table is equals to 1
    if (Boolean(isNewPassword) && request.nextUrl.pathname === "/change-password") {
      console.warn("Redirecting to /charts because user does not need to change password");
      return NextResponse.redirect(new URL("/charts", request.url));
    }

    if (currentTime > decoded.exp) {
      // eslint-disable-next-line no-console
      console.log("Token expired, deleting cookie");
      const response = NextResponse.next();
      response.cookies.delete(cookieName);
      return response;
    }

    // Handle authenticated users trying to access public routes
    if (publicRoutes.includes(request.nextUrl.pathname)) {
      // eslint-disable-next-line no-console
      console.log("Redirecting to / because user is already authenticated");
      return NextResponse.redirect(new URL("/charts", request.url));
    }
    // Allow access for authenticated users
    return NextResponse.next();
  }
  catch (error) {
    console.error("Error decoding token:", error);
    // eslint-disable-next-line no-console
    console.log("Deleting invalid token cookie");
    const response = NextResponse.next();
    response.cookies.delete(cookieName);
    return response;
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/reset-password",
    "/forgot-password",
    "/change-password",
    "/change-current-password",
    "/supply",
    "/demand",
    "/reports",
    "/charts",
    "/reports/supply-demand-forecast",
    "/reports/weekly-deployment",
  ],
};
