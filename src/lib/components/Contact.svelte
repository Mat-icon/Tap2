
<script lang="ts">
  import Button from "./ui/Button.svelte";
  import {  SendHorizontal } from "lucide-svelte";
  import { MapPin, Phone, Mail } from "lucide-svelte";
  import Img from "$lib/assets/women-showing-friend-request-icon-using-tablet-min.jpg"
  import StaggerText from "./ui/StaggerText.svelte";
</script>

<section class="w-full min-h-screen max-w-screen-2xl mx-auto overflow-hidden font-heading bg-[whitesmoke]">
  <!-- Header Section -->
  <div class="flex flex-col-reverse md:flex-row xl:flex-row items-center justify-between h-[600px] md:h-[500px]">
    <!-- Left side – Text -->
    <div class="flex-1 mt-6 md:mt-14 md:pl-12 flex flex-col text-center md:text-left px-6">
      <span class="w-fit text-primary mx-auto md:mx-0 font-light mb-2 text-sm tracking-normal  py-1 px-4 bg-crimson/20 rounded-full">
        Contact Us
      </span>
     <StaggerText
  text="Whether you’re onboarding new members, or analyzing engagement, our system simplifies every step."
  className="text-3xl text-left xl:text-5xl font-heading1 leading-12 text-black"
/>

      <Button
        title="See Dashboard"
        link="/dashboard"
        class="bg-primary w-10/12 md:mx-0 mx-auto md:w-50 mt-6 hover:bg-crimson/80 hover:text-black text-white"
        icon={SendHorizontal}
      />
    </div>

    <!-- Right side – Image -->
    <div class="flex-1 relative w-full h-full">
      <img
        src={Img}
        alt="Contact header"
        class="object-cover w-full h-full"
      />
    </div>
  </div>

  <!-- Contact Section -->
  <div class="max-w-6xl w-11/12 bg-white  my-10 rounded-xl mx-auto py-2 px-2 flex flex-col xl:flex-row gap-10 md:gap-16">
    <!-- Left side - Info -->
    <div class="flex-1 relative space-y-6 py-8 px-4 md:px-6">
      <h2 class="text-2xl xl:text-3xl tracking-tighter font-semibold text-black ">
        We’re Here to Help
      </h2>
      <p class="text-gray-700 text-sm xl:text-base leading-relaxed">
        Whether you’re interested in a new installation, need maintenance, or just want to learn more about our services, we’re ready to assist you.
      </p>

      <!-- Contact Info -->
      <div class="space-y-4 text-sm xl:text-base text-gray-700">
        <div class="flex items-center gap-3">
          <div class="flex py-2 px-2 bg-primary/20 text-black items-center rounded-full">
            <MapPin class="w-5 h-5" />
          </div>
          <span>123 Smart Avenue, Lagos, Nigeria</span>
        </div>

        <div class="flex items-center gap-3">
          <div class="flex py-2 px-2 bg-primary/20 text-black items-center rounded-full">
            <Phone class="w-5 h-5" />
          </div>
          <span>+234 812 345 6789</span>
        </div>

        <div class="flex items-center gap-3">
          <div class="flex py-2 px-2 bg-primary/20 text-black items-center rounded-full">
            <Mail class="w-5 h-5" />
          </div>
          <span>support@smarttech.com</span>
        </div>
      </div>

      <div class="xl:absolute xl:bottom-8 border border-primary/20 bg-white p-4 rounded-2xl">
        <h3>Follow Us On</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-5 pt-4">
          <a href="/" class="text-gray-700 hover:text-primary underline">TikTok</a>
          <a href="/" class="text-gray-700 hover:text-primary underline">Facebook</a>
          <a href="/" class="text-gray-700 hover:text-primary underline">Instagram</a>
          <a href="/" class="text-gray-700 hover:text-primary underline">Twitter</a>
        </div>
      </div>
    </div>

    <!-- Right side - Form -->
    <div class="flex-1 bg-white border border-primary/20 md:px-8 md:py-8 py-8 px-6 rounded-2xl">
      <h3 class="text-2xl xl:text-3xl tracking-tighter font-semibold mb-6 text-black">
        Send Us a Message
      </h3>
      <form class="space-y-5">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            class="w-full border-b-2 border-gray-300 p-3 focus:outline-none"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            class="w-full border-b-2 border-gray-300 p-3 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            rows={5}
            id="message"
            class="w-full border-b-2 border-gray-300 p-3 focus:outline-none"
            placeholder="Write your message here..."
          ></textarea>
        </div>

        <Button
          title="Send Message"
          link="/find-products"
          class="bg-black/90 hover:bg-primary/40 hover:text-black w-full text-white"
          icon={SendHorizontal}
        />
      </form>
    </div>
  </div>
</section>
