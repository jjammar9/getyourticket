<script setup>
import { Menu, X } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  mobileMenuOpen: Boolean,
  navData: Object,
  toggleMobileMenu: Function,
});

const navRoutes = {
  places: "/attractions",
  things: "/things-to-do",
  inspiration: "/experiences",
};

function goTo(key) {
  router.push(navRoutes[key] || "/");
}
</script>

<template>
  <div class="lg:hidden">
    <!-- top mobile bar -->
    <div class="flex items-center justify-between px-5 py-4">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold"
        >
          G
        </div>

        <h1 class="text-xl font-bold text-gray-900">GetYourTicket</h1>
      </div>

      <button @click="toggleMobileMenu">
        <Menu v-if="!mobileMenuOpen" :size="28" />
        <X v-else :size="28" />
      </button>
    </div>

    <!-- mobile menu -->
    <div v-if="mobileMenuOpen" class="px-5 pb-6 border-t bg-white dark:bg-gray-800 dark:border-gray-700">
      <div class="flex flex-col gap-5 pt-5">
        <button
          v-for="(item, key) in navData"
          :key="key"
          @click="goTo(key)"
          class="text-left font-semibold text-gray-700 dark:text-gray-200"
        >
          {{ item.label }}
        </button>
      </div>
    </div>
  </div>
</template>
