<template>
  <section
    class="relative h-[55vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] bg-cover bg-center"
    style="
      background-image: url(&quot;https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1920&q=80&quot;);
    "
  >
    <!-- overlay -->
    <div class="absolute inset-0 bg-black/35"></div>

    <!-- centered content -->
    <div
      class="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 text-center"
    >
      <h1
        class="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-4xl"
      >
        Discover & book things to do
      </h1>

      <!-- search bar -->
      <div
        class="mt-5 bg-white rounded-2xl sm:rounded-full shadow-2xl p-2 w-full max-w-xs sm:max-w-xl md:max-w-2xl"
      >
        <div
          class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
        >
          <input
            type="text"
            placeholder="Search destinations, attractions, activities..."
            class="flex-1 px-5 py-3 rounded-xl sm:rounded-full outline-none text-gray-800 font-semibold placeholder:font-medium text-sm sm:text-base"
          />

          <button
            class="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl sm:rounded-full transition"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
