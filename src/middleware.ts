import authConfig from '@@/auth.config';
import NextAuth from 'next-auth';
import {
  DEFAULT_LOGIN_REDIRECT,
  API_AUTH_PREFIX,
  PUBLIC_ROUTES,
  AUTH_ROUTES,
  REDIRECT_TO_LOGIN,
} from '@/routes';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isUserLoggedIn = Boolean(req.auth);

  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isUserLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isUserLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(REDIRECT_TO_LOGIN, nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
