<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import SplitType from "split-type";
  import { animate, stagger } from "motion";
  import Button from "./ui/Button.svelte";
  import { fly } from "svelte/transition";
  import { Phone } from "lucide-svelte";
  import ceoImg from "$lib/assets/a.png";

  let sectionRef: HTMLElement;
  let observer: IntersectionObserver;

  function animateText() {
    const splitHero = new SplitType(".animated-text", {
      lineClass: "overflow-hidden"
    });

    if (splitHero.words && splitHero.words.length > 0) {
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
  }

  onMount(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateText();
          }
        });
      },
      { threshold: 0.4 } 
    );

    if (sectionRef) observer.observe(sectionRef);
  });

  onDestroy(() => {
    if (observer && sectionRef) observer.unobserve(sectionRef);
  });
</script>



<section
  bind:this={sectionRef}
  class="w-full font-heading max-w-screen-2xl mx-auto bg-[whitesmoke] py-12 md:py-20 px-4 md:px-12"
>
  <section
    class="max-w-7xl rounded-md mx-auto bg-white h-auto bg-card flex flex-col items-center justify-center py-12 px-4 md:py-16 text-center"
  >
    <div class="w-40 h-40 md:w-60 md:h-60 rounded-full overflow-hidden mb-6">
      <img
        src={ceoImg}
        alt="CEO Person"
        class="object-cover object-center w-full h-full filter grayscale"
        width="500"
        height="500"
      />
    </div>

    <!-- Quote -->
    <p
      class="animated-text max-w-3xl text-xl md:text-2xl xl:text-3xl font-heading1 text-primary leading-relaxed"
    >
      &lsquo;&lsquo;Transformed the way we experience creating and
      managing efficiency. professionalism and modern approach made
      everything seamless.&rsquo;&rsquo;
    </p>

    <!-- Name & Title -->
    <div class="mt-8 text-sm tracking-tight font-semibold inline-block">
      <h3 class="text-black/80">
        Matthew Ameh,
        <span class="text-black/60">
          Tap2 <small class="text-[8px]">MT</small>
        </span>
      </h3>
    </div>
  </section>
</section>

<!-- Section 2 -->
<section
  class="w-full h-auto max-w-screen-2xl mx-auto font-heading bg-crimson/40 py-10 px-6 md:p-10"
>
  <div
    class="container flex xl:flex-row flex-col items-center justify-between md:px-4 mx-auto"
  >
    <h3
      class="w-full md:w-1/2 animated-text text-4xl text-primary text-center md:text-left leading-snug font-heading1"
    >
      Get in touch to know <br />Tap2&apos;s Member next steps.
    </h3>

    <div
      class="flex w-full flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-8 items-center justify-center xl:justify-end"
      in:fly={{ y: 40, duration: 800 }}
    >
      <Button
        title="Whatsapp No"
        class="bg-white w-full md:w-60 text-primary"
        icon={Phone}
        link="https://wa.me/2348027191872"
      />

      <Button
        title="Contact Us"
        class="bg-primary w-full md:w-60 text-white"
        icon={Phone}
        link="/contact"
      />
    </div>
  </div>
</section>
