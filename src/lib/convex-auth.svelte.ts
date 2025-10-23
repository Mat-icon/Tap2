import { useConvexClient } from 'convex-svelte';
import { useClerkContext } from 'svelte-clerk';

export function setupConvexAuth() {
  const client = useConvexClient();
  const clerk = useClerkContext();

  // Watch for auth changes
  $effect(() => {
    const session = clerk.session;

    if (session) {
      // Set Convex auth with a fetcher function
      client.setAuth(async () => {
        try {
          const token = await session.getToken({ template: 'convex' });
          return token ?? ''; // Return empty string if null
        } catch (error) {
          console.error('Failed to get Clerk token:', error);
          return '';
        }
      });
    } else {
      // Clear auth when user logs out
      client.setAuth(async () => '');
    }
  });

  return { client, clerk };
}
