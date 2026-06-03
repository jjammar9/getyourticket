<script setup>
defineProps({
  included: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div v-if="included.length" class="mt-14">
    <h2 class="text-[24px] font-bold tracking-[-0.3px] text-[#0b2343]" style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      What's included
    </h2>

    <ul class="mt-5 space-y-4">
      <li
        v-for="item in included"
        :key="item"
        class="flex items-start gap-3 text-gray-700"
      >
        <span class="font-bold text-green-600">✓</span>
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>
