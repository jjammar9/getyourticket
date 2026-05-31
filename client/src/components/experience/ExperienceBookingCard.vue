<script setup>
defineProps({
  experience: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="sticky top-8 border border-gray-200 rounded-3xl p-8 shadow-sm bg-white"
  >
    <p
      v-if="experience.oldPrice"
      class="text-[16px] text-gray-400 line-through"
    >
      €{{ experience.oldPrice }}
    </p>

    <p class="text-[52px] font-black leading-none text-[#e53935]">
      €{{ experience.price }}
    </p>

    <p class="mt-2 text-gray-500">per person</p>

    <button
      class="w-full mt-8 bg-[#0b2343] hover:bg-[#081a33] text-white font-bold py-4 rounded-2xl transition"
    >
      Book now
    </button>

    <div class="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-500">
      <p>✓ Free cancellation</p>
      <p class="mt-2">✓ Reserve now & pay later</p>
      <p class="mt-2">✓ Instant confirmation</p>
    </div>
  </div>
</template>
