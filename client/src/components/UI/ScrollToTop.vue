<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const visible = ref(false);

function onScroll() {
  visible.value = window.scrollY > 400;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => window.addEventListener("scroll", onScroll));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <button
    v-show="visible"
    @click="scrollToTop"
    class="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#fcb034] shadow-lg hover:bg-[#e89f2a] transition-all duration-300 flex items-center justify-center"
    aria-label="Scroll to top"
  >
    <svg
      class="w-5 h-5 text-white"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  </button>
</template>
