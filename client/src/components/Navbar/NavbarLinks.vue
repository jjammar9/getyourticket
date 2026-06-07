<script setup>
import { ChevronDown } from "lucide-vue-next";
import { useRouter, useRoute } from "vue-router";
import { useLocaleStore } from "../../stores/localeStore.js";

const router = useRouter();
const route = useRoute();
const localeStore = useLocaleStore();

const labelKeys = {
  places: "nav.placesToSee",
  things: "nav.thingsToDo",
  inspiration: "nav.tripInspiration",
};

defineProps({
  navData: Object,
  toggleDropdown: Function,
  handleHoverStart: Function,
  handleHoverEnd: Function,
  countryName: { type: String, default: "" },
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
    <router-link
      v-if="countryName"
      :to="route.path"
      class="group relative flex items-center gap-1.5 text-[15px] font-semibold text-gray-400 dark:text-gray-500 hover:text-[#ff5533] transition-colors"
    >
      {{ localeStore.t("nav.explore", { country: countryName }) }}
      <span
        class="absolute left-1/2 -bottom-2 h-[2px] w-0 bg-[#ff5533] transition-all duration-300 -translate-x-1/2 group-hover:w-full"
      ></span>
    </router-link>
    <span
      v-if="countryName"
      class="text-gray-300 dark:text-gray-600 text-[24px] font-bold flex items-center -mt-2"
    >.</span>
    <button
      v-for="(item, key) in navData"
      :key="key"
      @click="handleClick(key)"
      @mouseenter="handleHoverStart(key)"
      @mouseleave="handleHoverEnd"
      class="group relative flex items-center gap-1.5 text-[15px] font-medium text-[#061d44] dark:text-gray-200 hover:text-[#ff5533] transition-colors"
    >
      {{ localeStore.t(labelKeys[key] || item.label) }}

      <ChevronDown
        :size="12"
        :stroke-width="2"
        class="text-[#6f7d94] dark:text-gray-400 transition-colors group-hover:text-[#ff5533]"
      />

      <span
        class="absolute left-1/2 -bottom-2 h-[2px] w-0 bg-[#ff5533] transition-all duration-300 -translate-x-1/2 group-hover:w-full"
      ></span>
    </button>
  </div>
</template>
