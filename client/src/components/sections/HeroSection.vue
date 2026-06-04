<script setup>
import Container from "../ui/Container.vue";
import SearchBar from "../ui/SearchBar.vue";
</script>

<template>
  <section
    class="relative h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[80vh] bg-cover bg-center"
    style="
      background-image: url(&quot;https://cdn.getyourguide.com/tf/assets/static/banners/hero-banner-landscape-2.png&quot;);
    "
  >
    <div class="absolute inset-0 bg-black/35"></div>

    <Container>
      <div
        class="relative z-10 h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[80vh] flex flex-col items-center justify-center text-center"
      >
        <h1
          class="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[57px] font-bold leading-tight lg:leading-[54px] tracking-[-1.5px]" style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;"
        >
          Discover &amp; book things to do
        </h1>

        <div class="mt-9 w-full max-w-[540px]">
          <SearchBar />
        </div>
      </div>
    </Container>
  </section>
</template>
