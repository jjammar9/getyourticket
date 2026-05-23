<script setup>
import { Menu, X } from "lucide-vue-next";

defineProps({
  mobileMenuOpen: Boolean,
  navData: Object,
  toggleMobileMenu: Function,
});
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
    <div v-if="mobileMenuOpen" class="px-5 pb-6 border-t bg-white">
      <div class="flex flex-col gap-5 pt-5">
        <a
          v-for="(item, key) in navData"
          :key="key"
          href="#"
          class="font-semibold text-gray-700"
        >
          {{ item.label }}
        </a>
      </div>
    </div>
  </div>
</template>
