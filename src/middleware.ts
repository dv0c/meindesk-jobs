// middleware.js
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req:NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the current route is the root route
  const isProtectedRoute = pathname === '/';

  // Skip middleware if the route does not need authentication
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Get token (user's session)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token exists, redirect to the sign-in page
  if (!token) {
    const signInUrl = new URL('/sign-in', req.url); // Adjust path to your sign-in page
    return NextResponse.redirect(signInUrl);
  }

  // Allow access if authenticated
  return NextResponse.next();
}

export const config = {
  matcher: '/', // Apply middleware only to the root route
};
