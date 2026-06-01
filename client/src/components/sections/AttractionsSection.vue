<script setup>
import { ref, computed } from "vue";
import { attractionsCards } from "../../data/homeData.js";

import SectionTitle from "../ui/SectionTitle.vue";
import Card from "../ui/Card.vue";

const currentPage = ref(0);
const itemsPerPage = 4;

const visibleCards = computed(() => {
  const start = currentPage.value * itemsPerPage;
  return attractionsCards.slice(start, start + itemsPerPage);
});

const nextPage = () => {
  if ((currentPage.value + 1) * itemsPerPage < attractionsCards.length) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
};
</script>

<template>
  <section class="py-10">
    <SectionTitle title="Attractions you can't miss" />

    <div class="relative">
      <button
        v-if="currentPage > 0"
        @click="prevPage"
        class="absolute left-[-18px] top-[42%] -translate-y-1/2 z-20 w-11 h-11 rounded-full border-2 border-blue-500 bg-white flex items-center justify-center shadow-md hover:shadow-lg transition"
      >
        ←
      </button>

      <transition
        mode="out-in"
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-x-6"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 -translate-x-6"
      >
        <div :key="currentPage" class="grid grid-cols-4 gap-6">
          <Card
            v-for="card in visibleCards"
            :key="card.title"
            type="destination"
            :title="card.title"
            :subtitle="card.subtitle"
            :image="card.image"
          />
        </div>
      </transition>

      <button
        v-if="(currentPage + 1) * itemsPerPage < attractionsCards.length"
        @click="nextPage"
        class="absolute right-[-18px] top-[42%] -translate-y-1/2 z-20 w-11 h-11 rounded-full border-2 border-blue-500 bg-white flex items-center justify-center shadow-md hover:shadow-lg transition"
      >
        →
      </button>
    </div>
  </section>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.35s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}

.slide-move {
  transition: transform 0.35s ease;
}
</style>
