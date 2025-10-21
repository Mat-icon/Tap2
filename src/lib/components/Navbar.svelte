<script>
  import { fly } from 'svelte/transition';
  import { Icon } from 'svelte-icons-pack';
  import { AiOutlineClose } from 'svelte-icons-pack/ai';

  let menuOpen = false;

  const links = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/contact', label: 'Contact' }
  ];
</script>

<nav class="w-full mx-auto font-heading fixed top-2 px-3 left-0 z-50">
  <div class="w-full md:w-11/12 lg:w-4/5  border border-primary/10 xl:w-2/4 bg-white/80 backdrop-blur-md rounded-xl  mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16 items-center">
      
      <div>
        <p class="font-extrabold text-primary  text-lg md:text-xl tracking-tighter">
          Tap2 
          <span class="text-[4px] uppercase md:text-[8px] text-gray-500 font-medium tracking-wide">
            LT
          </span>
        </p>
      </div>

      <div class="hidden md:flex text-sm space-x-2">
        {#each links as { href, label }}
          <a href={href} class="text-black hover:bg-primary/10 py-2 px-4 rounded-xl transition">
            {label}
          </a>
        {/each}
      </div>

      <button 
        class="md:hidden focus:outline-none text-xl"
        on:click={() => menuOpen = !menuOpen}
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

  {#if menuOpen}
    <div
      transition:fly={{ x: 400, duration: 400 }}
      class="fixed top-0 right-0 h-screen w-full sm:w-2/4 bg-white shadow-2xl z-40 flex flex-col justify-center items-center space-y-8"
    >
      <button 
        class="absolute top-5 right-6 text-2xl focus:outline-none"
        on:click={() => menuOpen = false}
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
           on:click={() => (menuOpen = false)}
          class="block text-gray-800 text-2xl  uppercase tracking-tight hover:text-blue-600"
        >
          {label}
        </a>
      {/each}
    </div>
  {/if}
</nav>
