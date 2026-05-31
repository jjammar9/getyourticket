<script setup>
defineProps({
  highlights: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div v-if="highlights.length" class="mt-14">
    <h2 class="text-[32px] font-black tracking-[-1px] text-[#0b2343]">
      Highlights
    </h2>

    <ul class="mt-5 space-y-4">
      <li
        v-for="highlight in highlights"
        :key="highlight"
        class="flex items-start gap-3 text-gray-700"
      >
        <span class="font-bold text-green-600">✓</span>
        <span>{{ highlight }}</span>
      </li>
    </ul>
  </div>
</template>
