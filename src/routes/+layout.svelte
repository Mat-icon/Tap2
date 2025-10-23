<script lang="ts">
import favicon from '$lib/assets/favicon.svg';
import '../global.css';
  import { ClerkProvider } from 'svelte-clerk';
  import { setupConvex } from 'convex-svelte';
  import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
  import { PUBLIC_CONVEX_URL } from '$env/static/public';
import Navbar from '$lib/components/Navbar.svelte';
 
let { children } = $props();
  
setupConvex(PUBLIC_CONVEX_URL);

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<ClerkProvider  appearance={{
    variables: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
    }
  }} publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
  <Navbar />
{@render children()}
</ClerkProvider>
