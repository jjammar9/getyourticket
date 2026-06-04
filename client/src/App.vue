<script setup>
import Navbar from "./components/layout/Navbar.vue";
import Footer from "./components/layout/Footer.vue";
import Toast from "./components/ui/Toast.vue";
import { useBookingStore } from "./stores/bookingStore.js";

const bookingStore = useBookingStore();
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
    <Navbar />

    <main class="flex-1">
      <RouterView />
    </main>

    <Footer />

    <Toast
      v-if="bookingStore.toast"
      :message="bookingStore.toast"
      @dismiss="bookingStore.dismissToast()"
    />
  </div>
</template>
