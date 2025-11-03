import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = {
  client: ['/dashboard', '/hrs'],
  hr: ['/dashboard', '/clients'],
  admin: ['/dashboard', '/admin'],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Redirect to login if accessing protected routes without token
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user has token and tries to access auth pages, redirect to dashboard
  if (token && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup', '/hrs', '/clients', '/admin'],
};