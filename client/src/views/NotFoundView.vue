<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <div class="py-20 text-center">
    <h1 class="text-5xl font-black">404</h1>
    <p class="mt-4 text-gray-500">Page not found</p>
    <button
      @click="router.push('/')"
      class="mt-8 bg-[#0a6cff] hover:bg-[#0057d8] text-white font-semibold px-8 py-3 rounded-full transition"
    >
      Back to Home
    </button>
  </div>
</template>
