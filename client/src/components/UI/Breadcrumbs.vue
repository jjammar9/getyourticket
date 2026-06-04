<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  pages: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="mb-6 text-sm text-gray-500 font-medium flex items-center flex-wrap">
    <button @click="router.push('/')" class="hover:text-[#0b2343] transition-colors cursor-pointer">
      Home
    </button>
    <template v-for="(page, i) in pages" :key="i">
      <span class="mx-2">›</span>
      <button
        v-if="page.to"
        @click="router.push(page.to)"
        class="hover:text-[#0b2343] transition-colors cursor-pointer"
      >
        {{ page.label }}
      </button>
      <span v-else class="text-gray-700 font-semibold">{{ page.label }}</span>
    </template>
  </div>
</template>
