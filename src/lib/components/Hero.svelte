<script>
  import { Gift, Shield, Users, SendHorizontal } from "lucide-svelte";
  import Button from "./ui/Button.svelte";
  import heroImg from "$lib/assets/happy-bio-food-customer-counter-min.jpg";
  import StaggerText from "./ui/StaggerText.svelte";
</script>

<section class="w-full h-auto xl:min-h-screen max-w-screen-2xl mx-auto font-heading flex justify-center items-center text-center px-2 md:px-6 bg-[whitesmoke] overflow-hidden">
  <div class="w-full bg-white container mt-20 h-fit xl:h-[500px] items-center mx-auto flex flex-col xl:flex-row pt-6 xl:pt-0 xl:pl-10 rounded-xl">
    <div class="xl:w-1/2 space-y-2 my-8 xl:my-0 px-5 text-left">
      
      <StaggerText
        text="Member Tracker <br /> Made Simple."
        className="text-5xl uppercase font-heading1 md:text-6xl xl:text-7xl text-primary"
      />

      <p class="text-gray-600 text-xs md:text-sm max-w-xl">
        Tap2 helps you track customer loyalty effortlessly, rewarding repeat
        customers and growing your brand engagement.
      </p>

      <div class="w-full flex flex-col sm:flex-row gap-2 md:gap-4 items-center mt-4 text-sm md:text-base">
        <Button
          title="Get Started"
          class="bg-primary w-full md:w-60 text-white"
          icon={SendHorizontal}
          link="/dashboard"
        />
        <Button
          title="Contact Us"
          class="bg-crimson w-full md:w-60 text-primary"
          icon={SendHorizontal}
          link="/contact"
        />
      </div>
    </div>

    <div class="mt-10 md:mt-0 flex justify-end w-full xl:w-1/2">
      <div
        class="relative w-full h-96 md:h-[500px] flex justify-center items-center bg-cover bg-center xl:rounded-r-xl bg-no-repeat overflow-hidden"
        style={`background-image: url(${heroImg})`}
      >
        <!-- Floating badges -->
        <div class="w-40 flex items-center h-10 absolute top-4 right-4 md:right-2 backdrop-blur-md bg-white/40 text-black pl-[2px] pr-3 rounded-md">
          <div class="flex items-center justify-center bg-crimson/80 w-10 h-8 rounded-md">
            <Shield class="w-5 h-5 text-white" />
          </div>
          <p class="text-xs md:text-sm font-medium ml-2">Access Data</p>
        </div>

        <div class="w-40 flex items-center h-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-md bg-white/40 text-black pl-[2px] pr-3 rounded-md">
          <div class="flex items-center justify-center bg-crimson/80 w-10 h-8 rounded-md">
            <Users class="w-5 h-5 text-white" />
          </div>
          <p class="text-xs md:text-sm font-medium ml-2">Customers</p>
        </div>

        <div class="w-40 flex items-center h-10 absolute bottom-4 left-4 md:left-2 backdrop-blur-md bg-white/40 text-black pl-[2px] pr-3 rounded-md">
          <div class="flex items-center justify-center bg-crimson/80 w-10 h-8 rounded-md">
            <Gift class="w-5 h-5 text-white" />
          </div>
          <p class="text-xs md:text-sm font-medium ml-2">Rewards</p>
        </div>
      </div>
    </div>
  </div>
</section>
