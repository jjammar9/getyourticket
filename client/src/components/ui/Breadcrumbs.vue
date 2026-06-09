<script setup>
import { useRouter } from "vue-router";
import { useLocaleStore } from "../../stores/localeStore.js";

const router = useRouter();
const localeStore = useLocaleStore();

defineProps({
  pages: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="mb-6 text-sm text-gray-500 dark:text-gray-400 font-medium flex items-center flex-wrap">
    <button @click="router.push('/')" class="hover:text-[#0b2343] dark:hover:text-white transition-colors cursor-pointer">
      {{ localeStore.t("crumb.home") }}
    </button>
    <template v-for="(page, i) in pages" :key="i">
      <span class="mx-2">›</span>
      <button
        v-if="page.to"
        @click="router.push(page.to)"
        class="hover:text-[#0b2343] dark:hover:text-white transition-colors cursor-pointer"
      >
        {{ page.label }}
      </button>
      <span v-else class="text-gray-700 dark:text-gray-300 font-semibold">{{ page.label }}</span>
    </template>
  </div>
</template>
