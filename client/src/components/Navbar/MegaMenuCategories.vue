<script setup>
defineProps({
  currentCategories: Array,
  activeCategory: String,
  setActiveCategory: Function,
});
</script>

<template>
  <div class="w-[260px] pr-8 border-r border-gray-200 shrink-0">
    <button
      v-for="category in currentCategories"
      :key="category"
      @mouseenter="setActiveCategory(category)"
      class="flex items-center gap-3 w-full text-left py-2 text-[24px] font-bold transition-all duration-200 origin-left"
      :class="
        activeCategory === category
          ? 'text-[#0f2147] scale-105'
          : 'text-gray-400 hover:text-[#0f2147] hover:scale-105'
      "
    >
      <span
        v-if="activeCategory === category"
        class="w-2.5 h-2.5 rounded-full bg-orange-500 border border-orange-200 shrink-0"
      ></span>

      <span v-else class="w-2.5 h-2.5 shrink-0"></span>

      <span class="leading-tight">
        {{ category }}
      </span>
    </button>
  </div>
</template>
