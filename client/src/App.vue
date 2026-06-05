<script setup>
import Navbar from "./components/layout/Navbar.vue";
import Footer from "./components/layout/Footer.vue";
import Toast from "./components/ui/Toast.vue";
import ScrollToTop from "./components/ui/ScrollToTop.vue";
import { useBookingStore } from "./stores/bookingStore.js";
import { useRoute } from "vue-router";
import { computed } from "vue";

const bookingStore = useBookingStore();
const route = useRoute();
const showMainNav = computed(() => route.path !== "/media" && route.path !== "/news" && route.path !== "/download-center" && route.path !== "/about");
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
    <Navbar v-if="showMainNav" />

    <main class="flex-1">
      <RouterView />
    </main>

    <Footer />

    <ScrollToTop />

    <Toast
      v-if="bookingStore.toast"
      :message="bookingStore.toast"
      @dismiss="bookingStore.dismissToast()"
    />
  </div>
</template>
