<script setup>
import MegaMenuCategories from "./MegaMenuCategories.vue";
import MegaMenuItems from "./MegaMenuItems.vue";

defineProps({
  activeDropdown: String,
  currentCategories: Array,
  activeCategory: String,
  setActiveCategory: Function,
  currentItems: Array,
  getImage: Function,
});
</script>

<template>
  <div
    v-if="activeDropdown"
    class="absolute left-0 top-full w-full bg-white shadow-xl border-t border-gray-100 z-50"
  >
    <div class="max-w-7xl mx-auto px-8 py-6">
      <div class="flex items-start">
        <!-- LEFT CATEGORIES -->
        <MegaMenuCategories
          :currentCategories="currentCategories"
          :activeCategory="activeCategory"
          :setActiveCategory="setActiveCategory"
        />

        <!-- RIGHT ITEMS -->
        <div class="pl-14 flex-1">
          <MegaMenuItems :currentItems="currentItems" :getImage="getImage" />
        </div>
      </div>
    </div>
  </div>
</template>
