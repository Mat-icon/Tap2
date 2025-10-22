<script lang="ts">
  import Card from "./ui/Card.svelte";
  import { goto } from "$app/navigation";
  import { intersect } from "$lib/utils/observer";
  import Img from "$lib/assets/women-showing-friend-request-icon-using-tablet-min.jpg";
  import Img1 from "$lib/assets/53932-min.jpg";
  import Img2 from "$lib/assets/January_life_style_working_51-min.jpg";
  import Img3 from "$lib/assets/woman-selecting-pictures-people-min.jpg";
 import { onMount, onDestroy } from "svelte";
  import SplitType from "split-type";
  import { animate, stagger } from "motion";

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


  const demoData = [
    {
      image: Img,
      title: "Create Members",
      subtitle: "Create new members easily",
      route: "/",
    },
    {
      image: Img1,
      title: "Edit Members",
      subtitle: "Update member information easily",
      route: "/",
    },
    {
      image: Img2,
      title: "Delete Members",
      subtitle: "Delete members you no longer need",
      route: "/",
    },
    {
      image: Img3,
      title: "Manage Data",
      subtitle: "Manage all your member data",
      route: "/",
    },
  ];

  const handleCardClick = (route: string) => {
    goto(route);
  };
</script>

<section  bind:this={sectionRef} class="max-w-screen-2xl mx-auto font-heading py-12 bg-[whitesmoke] md:py-20 px-4 md:px-10 xl:px-16">
  <div class="container mb-10 flex flex-col md:flex-row lg:justify-between">
    <h2 class="w-full flex text-primary flex-col mx-auto lg:mx-0 text-center md:text-left lg:w-3/6 text-3xl xl:text-5xl font-heading1">
      <span
        class="w-fit text-black mx-auto md:mx-0 font-light mb-2 text-sm tracking-normal font-heading py-1 px-4 bg-crimson/20 rounded-full">
        Our Services We Provide
      </span>
      <span class="animated-text ">Manage Your Members<br /> All in One Place.</span>
    </h2>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
    {#each demoData as item (item.title)}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        class="cursor-pointer opacity-0 translate-y-0 transition-all duration-700 ease-out"
        use:intersect={{ threshold: 0.2 }}
        on:intersect={(e: CustomEvent<boolean>) => {
          const el = e.currentTarget as HTMLElement;
          e.detail
            ? el.classList.add("opacity-100", "translate-y-0")
            : el.classList.remove("opacity-100", "translate-y-0");
        }}
        on:click={() => handleCardClick(item.route)}
      >
        <Card
          image={''}
          title={item.title}
          subtitle={item.subtitle}
          btn={true}
          backgroundImage={item.image}
        />
      </div>
    {/each}
  </div>
</section>
