<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { ArrowUp } from "lucide-vue-next";

const visible = ref(false);

let listener = null;

onMounted(() => {
  listener = () => {
    visible.value = window.scrollY > 500;
  };
  window.addEventListener("scroll", listener);
});

onUnmounted(() => {
  if (listener) window.removeEventListener("scroll", listener);
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <button
    v-if="visible"
    @click="scrollToTop"
    class="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#ff5a1f] text-white flex items-center justify-center shadow-lg hover:bg-[#e04e0f] transition-all duration-300"
  >
    <ArrowUp :size="22" stroke-width="2.5" />
  </button>
</template>
