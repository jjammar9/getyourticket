<script setup>
defineProps({
  experience: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["book"]);
</script>

<template>
  <div
    class="sticky top-8 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-sm bg-white dark:bg-gray-800"
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

    <p class="mt-2 text-gray-500 dark:text-gray-400">per person</p>

    <button
      @click="emit('book', experience)"
      class="w-full mt-8 bg-[#0b2343] hover:bg-[#081a33] text-white font-bold py-4 rounded-2xl transition"
    >
      Book now
    </button>

    <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
      <p>✓ Free cancellation</p>
      <p class="mt-2">✓ Reserve now & pay later</p>
      <p class="mt-2">✓ Instant confirmation</p>
    </div>
  </div>
</template>
