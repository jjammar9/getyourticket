<script setup>
import { Menu, X, Heart, Calendar, ShoppingCart, User, LogIn } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { useLocaleStore } from "../../stores/localeStore.js";
import { useAuthStore } from "../../stores/authStore.js";
import { useBookingStore } from "../../stores/bookingStore.js";

const router = useRouter();
const localeStore = useLocaleStore();
const authStore = useAuthStore();
const bookingStore = useBookingStore();

const labelKeys = {
  places: "nav.placesToSee",
  things: "nav.thingsToDo",
  inspiration: "nav.tripInspiration",
};

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

const emit = defineEmits(["close", "openAuth"]);

function goTo(key) {
  router.push(navRoutes[key] || "/");
  emit("close");
}
</script>

<template>
  <div class="lg:hidden">
    <!-- top mobile bar -->
    <div class="flex items-center justify-between px-5 py-4">
      <div @click="router.push('/')" class="flex items-center gap-3 cursor-pointer">
        <div
          class="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold"
        >
          G
        </div>

        <h1 class="text-xl font-bold text-gray-900 dark:text-white">GetYourTicket</h1>
      </div>

      <button @click="toggleMobileMenu" class="p-2">
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
          {{ localeStore.t(labelKeys[key] || item.label) }}
        </button>

        <hr class="border-gray-200 dark:border-gray-700" />

        <button
          @click="router.push('/wishlist'); emit('close')"
          class="flex items-center gap-3 text-left font-semibold text-gray-700 dark:text-gray-200"
        >
          <div class="relative">
            <Heart :size="20" />
            <span
              v-if="authStore.wishlistCount > 0"
              class="absolute -top-1.5 -right-1.5 min-w-[14px] h-3.5 px-1 rounded-full bg-[#ff5533] text-white text-[9px] font-bold flex items-center justify-center leading-none"
            >{{ authStore.wishlistCount > 99 ? '99+' : authStore.wishlistCount }}</span>
          </div>
          {{ localeStore.t("nav.wishlist") }}
        </button>

        <button
          @click="router.push('/bookings'); emit('close')"
          class="flex items-center gap-3 text-left font-semibold text-gray-700 dark:text-gray-200"
        >
          <div class="relative">
            <Calendar :size="20" />
            <span
              v-if="authStore.bookingCount > 0"
              class="absolute -top-1.5 -right-1.5 min-w-[14px] h-3.5 px-1 rounded-full bg-[#ff5533] text-white text-[9px] font-bold flex items-center justify-center leading-none"
            >{{ authStore.bookingCount > 99 ? '99+' : authStore.bookingCount }}</span>
          </div>
          {{ localeStore.t("nav.bookings") }}
        </button>

        <button
          @click="router.push('/cart'); emit('close')"
          class="flex items-center gap-3 text-left font-semibold text-gray-700 dark:text-gray-200"
        >
          <div class="relative">
            <ShoppingCart :size="20" />
            <span
              v-if="bookingStore.cartCount > 0"
              class="absolute -top-1.5 -right-1.5 min-w-[14px] h-3.5 px-1 rounded-full bg-[#ff5533] text-white text-[9px] font-bold flex items-center justify-center leading-none"
            >{{ bookingStore.cartCount > 99 ? '99+' : bookingStore.cartCount }}</span>
          </div>
          {{ localeStore.t("nav.cart") }}
        </button>

        <button
          v-if="authStore.isLoggedIn"
          @click="router.push('/profile'); emit('close')"
          class="flex items-center gap-3 text-left font-semibold text-gray-700 dark:text-gray-200"
        >
          <User :size="20" /> {{ localeStore.t("nav.profile") }}
        </button>

        <button
          v-else
          @click="emit('openAuth', 'signup'); emit('close')"
          class="flex items-center gap-3 text-left font-semibold text-gray-700 dark:text-gray-200"
        >
          <LogIn :size="20" /> {{ localeStore.t("nav.login") }}
        </button>
      </div>
    </div>
  </div>
</template>
