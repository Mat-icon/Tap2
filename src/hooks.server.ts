import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { CLERK_SECRET_KEY } from '$env/static/private';

// Optional: Add Clerk server-side validation if needed
export const handle: Handle = sequence(
  async ({ event, resolve }) => {
    // You can add server-side auth checks here if needed
    return resolve(event);
  }
);