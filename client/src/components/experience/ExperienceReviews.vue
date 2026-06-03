<script setup>
defineProps({
  rating: Number,
  reviews: Number,
});
</script>

<template>
  <div class="mt-16">
    <h2 class="text-[24px] font-bold tracking-[-0.3px] text-[#0b2343]" style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      Customer reviews
    </h2>

    <div class="mt-6 p-6 border border-gray-200 rounded-3xl">
      <div class="flex items-center gap-3">
        <span class="text-3xl font-black">
          {{ rating }}
        </span>

        <span class="text-yellow-500 text-xl"> ★★★★★ </span>
      </div>

      <p class="mt-2 text-gray-500">Based on {{ reviews }} reviews</p>
    </div>
  </div>
</template>
