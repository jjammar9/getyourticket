<template>
  <section
    class="relative h-[55vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] bg-cover bg-center"
    style="
      background-image: url(&quot;https://cdn.getyourguide.com/tf/assets/static/banners/hero-banner-landscape-2.png&quot;);
    "
  >
    <!-- overlay -->
    <div class="absolute inset-0 bg-black/35"></div>

    <!-- centered content -->
    <div
      class="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 text-center"
    >
      <h1
        class="text-white text-[65px] font-bold leading-[0.95] tracking-[-3px] max-w-[950px] text-center"
      >
        Discover &amp; book things to do
      </h1>

      <!-- search bar -->
      <div
        class="mt-5 bg-white rounded-2xl sm:rounded-full shadow-2xl p-2 w-full max-w-xs sm:max-w-xl md:max-w-1xl"
      >
        <div
          class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
        >
          <input
            type="text"
            placeholder="Find places and things to do"
            class="flex-1 px-5 py-3 rounded-xl sm:rounded-full outline-none text-gray-800 font-semibold placeholder:font-medium text-sm sm:text-base"
          />

          <button
            class="bg-[#0071eb] hover:bg-[#005fd1] text-white font-bold px-10 py-3 rounded-full text-[20px] shadow-md transition"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
