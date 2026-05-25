<script setup>
import { ChevronDown } from "lucide-vue-next";

defineProps({
  navData: Object,
  toggleDropdown: Function,
});
</script>

<template>
  <div class="flex items-center gap-10 pt-1 pb-1 pl-0">
    <button
      v-for="(item, key) in navData"
      :key="key"
      @click="toggleDropdown(key)"
      class="group relative flex items-center gap-1 font-semibold text-gray-700 hover:text-orange-500 transition pb-2"
    >
      {{ item.label }}

      <ChevronDown :size="16" />

      <span
        class="absolute left-1/2 bottom-0 h-[2px] w-0 bg-orange-500 transition-all duration-300 -translate-x-1/2 group-hover:w-full"
      ></span>
    </button>
  </div>
</template>
