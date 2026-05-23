<script setup>
defineProps({
  currentCategories: Array,
  activeCategory: String,
  setActiveCategory: Function,
});
</script>

<template>
  <div class="border-r border-gray-200 pr-8 space-y-3">
    <button
      v-for="category in currentCategories"
      :key="category"
      @click="setActiveCategory(category)"
      class="flex items-center gap-2 w-full text-left text-xl font-bold transition"
      :class="
        activeCategory === category
          ? 'text-gray-900'
          : 'text-gray-500 hover:text-gray-800'
      "
    >
      <span
        v-if="activeCategory === category"
        class="w-2 h-2 bg-orange-500 rounded-full"
      ></span>

      <span v-else class="w-2 h-2"></span>

      {{ category }}
    </button>
  </div>
</template>
