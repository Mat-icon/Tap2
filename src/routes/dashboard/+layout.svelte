<script>
  import { SignedIn, SignedOut, RedirectToSignIn } from 'svelte-clerk';
  import { ClerkProvider } from 'svelte-clerk';
  let { children } = $props();
</script>

<SignedOut>
  <RedirectToSignIn />
</SignedOut>

<SignedIn>
    <ClerkProvider>
  {@render children()}
    </ClerkProvider>
</SignedIn>