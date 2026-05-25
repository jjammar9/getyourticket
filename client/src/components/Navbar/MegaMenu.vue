<script setup>
import MegaMenuCategories from "./MegaMenuCategories.vue";
import MegaMenuItems from "./MegaMenuItems.vue";

defineProps({
  activeDropdown: String,
  currentCategories: Array,
  activeCategory: String,
  setActiveCategory: Function,
  currentItems: Array,
});
</script>

<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div
      v-if="activeDropdown"
      class="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100"
    >
      <div class="max-w-7xl mx-auto px-8 py-6">
        <div class="grid grid-cols-[220px_auto] gap-6 items-start">
          <MegaMenuCategories
            :currentCategories="currentCategories"
            :activeCategory="activeCategory"
            :setActiveCategory="setActiveCategory"
          />

          <MegaMenuItems :currentItems="currentItems" />
        </div>
      </div>

      <div
        class="w-full h-16 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"
      ></div>
    </div>
  </transition>
</template>
