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

const emit = defineEmits(["mouseenter-menu", "mouseleave-menu"]);
</script>

<template>
  <div
    v-if="activeDropdown"
    class="absolute left-0 top-full w-full bg-white dark:bg-gray-800 shadow-xl border-t border-gray-100 dark:border-gray-700 z-50"
    @mouseenter="emit('mouseenter-menu')"
    @mouseleave="emit('mouseleave-menu')"
  >
    <div class="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-6">
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
