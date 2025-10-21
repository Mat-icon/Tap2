<script lang="ts">
import { onMount } from "svelte";
import SplitType from "split-type";
import { animate, stagger } from "motion";

export let text : string;
export let className : string = "";

let heroEl : HTMLElement;

onMount(() => {
  if (!heroEl) return;

  const splitHero = new SplitType(heroEl, { lineClass: "overflow-hidden" });

  if (splitHero && splitHero.words) {
    animate(
      splitHero.words,
      { y: ["100%", "0%"], opacity: [0, 1] },
      {
        delay: stagger(0.05),
        duration: 0.9,
        easing: [0.62, -0.01, 0.37, 0.99],
      } as any
    );
  }
});
</script>

<h1 bind:this={heroEl} class={className}> {@html text}</h1>