/**
 * An array of public routes that do not require authentication.
 * These routes are accessible to all users.
 */
export const PUBLIC_ROUTES: string[] = ['/', '/auth/new-verification'];

/**
 * An array of authentication routes.
 */
export const AUTH_ROUTES: string[] = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/forgot-password',
  '/auth/new-password',
];

/**
 * An array of private routes that require authentication.
 * These routes are only accessible to authenticated users.
 */
export const PRIVATE_ROUTES: string[] = ['/settings'];

/**
 * The API route prefix for API authentication routes.
 * Routes that start with this prefix are considered API authentication routes.
 */
export const API_AUTH_PREFIX: string = '/api/auth';

/**
 * The default login redirect path.
 * This is the path that users are redirected to after logging in.
 */
export const DEFAULT_LOGIN_REDIRECT: string = '/settings';

/**
 * The path to redirect to when the user is not logged in.
 */
export const REDIRECT_TO_LOGIN: string = '/auth/login';
