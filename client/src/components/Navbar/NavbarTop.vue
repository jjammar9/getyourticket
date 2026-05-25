<script setup>
import { Heart, ShoppingCart, User } from "lucide-vue-next";

defineProps({
  isScrolled: Boolean,
});
</script>

<template>
  <div
    :class="[
      'flex items-center justify-between transition-all duration-300',
      isScrolled ? 'py-3' : 'pt-5',
    ]"
  >
    <!-- LEFT -->
    <div class="flex items-center">
      <!-- LOGO -->
      <div
        class="w-11 h-11 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
      >
        G
      </div>

      <!-- BRAND NAME -->
      <h1
        :class="[
          'text-2xl font-bold text-gray-900 shrink-0 overflow-hidden transition-all duration-300',
          isScrolled ? 'opacity-0 w-0 ml-0' : 'opacity-100 w-[170px] ml-4',
        ]"
      >
        GetYourTicket
      </h1>

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
    <div class="flex items-center gap-5">
      <button
        class="flex items-center gap-2 font-semibold text-gray-700 hover:text-orange-500 transition"
      >
        <Heart :size="18" />
        Wishlist
      </button>

      <button
        class="flex items-center gap-2 font-semibold text-gray-700 hover:text-orange-500 transition"
      >
        <ShoppingCart :size="18" />
        Cart
      </button>

      <button
        class="flex items-center gap-2 font-semibold text-gray-700 hover:text-orange-500 transition"
      >
        <User :size="18" />
        Profile
      </button>
    </div>
  </div>
</template>
