<script setup>
import { Heart, ShoppingCart, User } from "lucide-vue-next";
</script>

<template>
  <div class="flex items-center justify-between pt-5">
    <!-- Left -->
    <div class="flex items-center gap-4">
      <div
        class="w-11 h-11 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-lg"
      >
        G
      </div>

      <h1 class="text-2xl font-bold text-gray-900">GetYourTicket</h1>
    </div>

    <!-- Right -->
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
