<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import Button from "./Button.svelte";
  import { SendHorizontal } from "lucide-svelte";
  import type { ComponentType } from "svelte";
  
  interface Props {
    image: string;
    title: string;
    subtitle: string;
    btn?: boolean;
    backgroundImage?: string;
  }
  
  let { 
    image, 
    title, 
    subtitle, 
    btn = false, 
    backgroundImage = undefined 
  }: Props = $props();
</script>

<div class="flex flex-col space-y-2">
  <div
    class="relative flex flex-col w-full h-[250px] rounded-xl p-2 bg-primary/10 overflow-hidden"
    in:fly={{ y: 30, duration: 400 }}
  >
    {#if backgroundImage}
      <img
        src={backgroundImage}
        alt="Background"
        class="absolute inset-0 w-full h-full object-cover rounded-xl"
      />
    {:else}
      <div class="relative w-full h-full z-10">
        <img src={image} alt={title} class="object-contain w-full h-full" />
      </div>
    {/if}

    {#if btn}
      <div class="absolute bottom-2 left-2 z-20">
        <Button
          title="Hire Me"
          class="bg-primary/70 hover:bg-crimson/80 hover:text-black backdrop-blur-md w-48 cursor-pointer text-white"
          icon={SendHorizontal}
          link="/contact"
        />
      </div>
    {/if}
  </div>

  <!-- Title & Subtitle -->
  <div class="flex flex-col py-5 px-3 md:p-5 bg-white rounded-xl">
    <h3 class="text-lg font-heading font-semibold md:text-xl tracking-tight text-black">
      {title}
    </h3>
    <p class="mt-2 text-xs text-gray-600">{subtitle}</p>
  </div>
</div>