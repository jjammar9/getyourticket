<script setup>
import { Heart, ShoppingCart, User, Globe } from "lucide-vue-next";

defineProps({
  isScrolled: Boolean,
});
</script>

<template>
  <div
    :class="[
      'flex items-center justify-between transition-all duration-300',
      isScrolled ? 'py-2' : 'pt-2.5 pb-2',
    ]"
  >
    <!-- LEFT -->
    <div class="flex items-center">
      <!-- LOGO -->
      <div class="leading-[0.78] select-none cursor-pointer">
        <!-- GET -->
        <p
          class="text-[20px] font-black uppercase tracking-[-4px] text-[#ff5b00]"
        >
          <span class="relative inline-block">
            G
            <span
              class="absolute left-0 top-1/2 w-full h-[2px] bg-white -translate-y-1/2"
            ></span>
          </span>
          et
        </p>

        <!-- YOUR -->
        <p
          class="text-[20px] font-black uppercase tracking-[-2px] text-[#ff5b00]"
        >
          Your
        </p>

        <!-- TICKET -->
        <p
          class="text-[20px] font-black uppercase tracking-[-3px] text-[#ff5b00]"
        >
          <span class="relative inline-block">
            T
            <span
              class="absolute left-0 top-1/2 w-full h-[3px] bg-white -translate-y-1/2"
            ></span>
          </span>
          icke
          <span class="relative inline-block">
            t
            <span
              class="absolute left-0 top-1/2 w-full h-[3px] bg-white -translate-y-1/2"
            ></span>
          </span>
        </p>
      </div>
      <!-- SEARCH -->
      <div
        :class="[
          'overflow-hidden transition-all duration-300',
          isScrolled ? 'opacity-100 w-[360px] ml-4' : 'opacity-0 w-0 ml-0',
        ]"
      >
        <div
          class="flex items-center bg-white border border-gray-200 rounded-full shadow-sm p-1"
        >
          <input
            type="text"
            placeholder="Find places and things to do"
            class="flex-1 px-4 py-2 outline-none rounded-full text-sm text-gray-700"
          />

          <button
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition"
          >
            Search
          </button>
        </div>
      </div>
    </div>

    <!-- RIGHT -->
    <div class="flex items-center gap-8 pt-2">
      <button
        class="flex flex-col items-center text-[15px] font-medium text-gray-700 hover:text-orange-500 transition"
      >
        <Heart :size="20" />
        <span>Wishlist</span>
      </button>

      <button
        class="flex flex-col items-center text-[15px] font-medium text-gray-700 hover:text-orange-500 transition"
      >
        <ShoppingCart :size="20" />
        <span>Cart</span>
      </button>

      <button
        class="flex flex-col items-center text-[15px] font-medium text-gray-700 hover:text-orange-500 transition"
      >
        <Globe :size="20" />
        <span>EN/EUR €</span>
      </button>

      <button
        class="flex flex-col items-center text-[15px] font-medium text-gray-700 hover:text-orange-500 transition"
      >
        <User :size="20" />
        <span>Profile</span>
      </button>
    </div>
  </div>
</template>
