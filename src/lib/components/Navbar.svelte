<script>
  import { fly } from 'svelte/transition';
  import { Icon } from 'svelte-icons-pack';
  import { AiOutlineClose } from 'svelte-icons-pack/ai';
  import { useClerkContext } from 'svelte-clerk';
  import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from 'svelte-clerk';
  import { goto } from '$app/navigation';
  
  const clerk = useClerkContext();
  let menuOpen = $state(false);
  
  // Base links available to everyone
  const publicLinks = [
    { href: '/', label: 'Home' },
    { href: '/contact', label: 'Contact' }
  ];
  
  const privateLinks = [
    { href: '/dashboard', label: 'Dashboard' }
  ];
  
  // Combine links based on auth state - using derived state
  const links = $derived(
    clerk.user ? [...publicLinks, ...privateLinks] : publicLinks
  );
  
  // Watch for sign in and redirect to dashboard
  $effect(() => {
    if (clerk.user) {
      // User just signed in - you can optionally redirect
      // Uncomment the line below if you want auto-redirect to dashboard
       goto('/dashboard');
    }
  });
</script>

<nav class="w-full mx-auto font-heading fixed top-2 px-3 left-0 z-50">
  <div class="w-full md:w-11/12 lg:w-4/5 border border-primary/10 xl:w-2/4 bg-white/80 backdrop-blur-md rounded-xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16 items-center">
      
      <div>
        <a href="/">
          <p class="font-extrabold text-primary text-lg md:text-xl tracking-tighter">
            Tap2 
            <span class="text-[4px] uppercase md:text-[8px] text-gray-500 font-medium tracking-wide">
              LT
            </span>
          </p>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex text-sm space-x-2 items-center">
        {#each links as { href, label }}
          <a href={href} class="text-black hover:bg-primary/10 py-2 px-4 rounded-xl transition">
            {label}
          </a>
        {/each}
        
        <!-- Auth Buttons -->
        <div class="ml-4 flex items-center gap-2">
          <SignedOut>
            <SignInButton 
              mode="modal"
              signInForceRedirectUrl="/dashboard"
            >
              <button class="text-black hover:bg-primary/10 py-2 px-4 rounded-xl transition">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton 
              mode="modal"
              signUpForceRedirectUrl="/dashboard"
            >
              <button class="bg-primary text-white hover:bg-primary/90 py-2 px-4 rounded-xl transition">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button 
        class="md:hidden focus:outline-none text-xl"
        onclick={() => menuOpen = !menuOpen}
      >
        {#if menuOpen}
          <span class="inline-flex items-center justify-center w-6 h-6 text-black">
            <Icon src={AiOutlineClose} />
          </span>
        {:else}
          ☰
        {/if}
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if menuOpen}
    <div
      transition:fly={{ x: 400, duration: 400 }}
      class="fixed top-0 right-0 h-screen w-full sm:w-2/4 bg-white shadow-2xl z-40 flex flex-col justify-center items-center space-y-8"
    >
      <button 
        class="absolute top-5 right-6 text-2xl focus:outline-none"
        onclick={() => menuOpen = false}
      >
        <span class="inline-flex items-center justify-center w-6 h-6 text-black">
          <Icon src={AiOutlineClose} />
        </span>
      </button>

      <!-- Animated Links -->
      {#each links as { href, label }, i}
        <a
          href={href}
          transition:fly={{ y: 30, duration: 300, delay: 400 + i * 120 }}
          onclick={() => (menuOpen = false)}
          class="block text-gray-800 text-2xl uppercase tracking-tight hover:text-blue-600"
        >
          {label}
        </a>
      {/each}

      <!-- Mobile Auth Buttons -->
      <div class="flex flex-col gap-4 mt-8">
        <SignedOut>
          <SignInButton 
            mode="modal"
            signInForceRedirectUrl="/dashboard"
          >
            <button 
              onclick={() => (menuOpen = false)}
              class="text-black hover:bg-primary/10 py-3 px-8 rounded-xl transition text-xl uppercase"
            >
              Sign In
            </button>
          </SignInButton>
          <SignUpButton 
            mode="modal"
            signUpForceRedirectUrl="/dashboard"
          >
            <button 
              onclick={() => (menuOpen = false)}
              class="bg-primary text-white hover:bg-primary/90 py-3 px-8 rounded-xl transition text-xl uppercase"
            >
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        
        <SignedIn>
          <div class="flex flex-col items-center gap-4">
            <UserButton afterSignOutUrl="/"  />
            {#if clerk.user?.primaryEmailAddress?.emailAddress}
              <p class="text-xs text-gray-600">
                Signed in as {clerk.user.primaryEmailAddress.emailAddress}
              </p>
            {/if}
          </div>
        </SignedIn>
      </div>
    </div>
  {/if}
</nav>