<script setup>
import { ChevronDown } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  navData: Object,
  toggleDropdown: Function,
  handleHoverStart: Function,
  handleHoverEnd: Function,
});

const navRoutes = {
  places: "/attractions",
  things: "/things-to-do",
  inspiration: "/experiences",
};

function handleClick(key) {
  router.push(navRoutes[key] || "/");
}
</script>

<template>
  <div class="flex items-center gap-8 pb-2">
    <button
      v-for="(item, key) in navData"
      :key="key"
      @click="handleClick(key)"
      @mouseenter="handleHoverStart(key)"
      @mouseleave="handleHoverEnd"
      class="group relative flex items-center gap-1.5 text-[15px] font-semibold text-[#061d44] hover:text-[#ff5533] transition-colors"
    >
      {{ item.label }}

      <ChevronDown
        :size="12"
        :stroke-width="2"
        class="text-[#6f7d94] transition-colors group-hover:text-[#ff5533]"
      />

      <span
        class="absolute left-1/2 -bottom-2 h-[2px] w-0 bg-[#ff5533] transition-all duration-300 -translate-x-1/2 group-hover:w-full"
      ></span>
    </button>
  </div>
</template>
