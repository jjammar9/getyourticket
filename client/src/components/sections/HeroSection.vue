<script setup>
import Container from "../ui/Container.vue";
import SearchBar from "../ui/SearchBar.vue";
</script>

<template>
  <section
    class="relative h-[55vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] bg-cover bg-center"
    style="
      background-image: url(&quot;https://cdn.getyourguide.com/tf/assets/static/banners/hero-banner-landscape-2.png&quot;);
    "
  >
    <div class="absolute inset-0 bg-black/35"></div>

    <Container>
      <div
        class="relative z-10 h-[55vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] flex flex-col items-center justify-center text-center"
      >
        <h1
          class="text-white text-[65px] font-bold leading-[0.95] tracking-[-3px] max-w-[950px]"
        >
          Discover & book things to do
        </h1>

        <div class="mt-5 w-full max-w-4xl">
          <SearchBar />
        </div>
      </div>
    </Container>
  </section>
</template>
