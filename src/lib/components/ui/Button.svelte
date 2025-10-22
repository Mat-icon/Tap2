<script lang="ts">
  import type { ComponentType } from "svelte";

  interface Props {
    title: string;
    link?: string;
    onClick?: () => void;
    icon?: ComponentType | null;
    class?: string;
    disabled?: boolean;
  }

  let {
    title,
    link,
    onClick,
    icon = null,
    class: className = "",
    disabled = false
  }: Props = $props();

  const baseClasses =
    "pl-4 pr-[2px] md:pl-5 py-[2px] text-xs sm:text-sm md:text-sm font-medium rounded-md transition flex items-center justify-between active:scale-90";
</script>

{#if link}
  <a href={link}  class={`${baseClasses} bg-black ${className}`}>
    <span class="flex-1 text-left">{title}</span>
    {#if icon}
      <span class="ml-auto p-3 md:p-3 rounded-sm bg-white text-black text-base">
        <svelte:component this={icon} />
      </span>
    {/if}
  </a>
{:else}
  <button
    disabled={disabled}
    onclick={onClick}  
    class={`${baseClasses} ${className}`}
  >
    <span class="flex-1 text-xs text-left">{title}</span>
    {#if icon}
      <span class="ml-auto p-3 md:p-[10px] rounded-md bg-white text-primary text-base">
        <svelte:component this={icon} />
      </span>
    {/if}
  </button>
{/if}
