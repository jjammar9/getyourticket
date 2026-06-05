<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  slides: { type: Array, required: true },
  visibleDots: { type: Number, default: 3 },
});

const limitedSlides = computed(() => props.slides.slice(0, props.visibleDots));
const currentSlide = ref(0);
const rightPressed = ref(false);

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + limitedSlides.value.length) % limitedSlides.value.length;
}

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % limitedSlides.value.length;
}

function pressRight() {
  rightPressed.value = true;
  setTimeout(() => { rightPressed.value = false; }, 200);
}

function goToSlide(index) {
  currentSlide.value = index;
}
</script>

<template>
  <div class="group bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
    <div class="p-10 pb-0">
      <div class="overflow-hidden rounded-lg relative">
        <div class="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-500 z-10"></div>
        <img :src="limitedSlides[currentSlide].image" alt="Press" class="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-125" />
      </div>
    </div>
    <div class="px-10 pb-10 pt-12">
      <div class="flex items-center gap-3">
        <span class="bg-[#0a6cff] text-white text-[13px] font-semibold px-4 py-1.5 rounded-[5px]">{{ limitedSlides[currentSlide].badge }}</span>
        <span class="text-[13px] text-gray-500 dark:text-gray-400 font-[family-name:var(--font-body)]">{{ limitedSlides[currentSlide].date }}</span>
      </div>
      <p class="mt-5 text-[22px] font-bold text-gray-900 dark:text-white font-[family-name:var(--font-display)] leading-tight">{{ limitedSlides[currentSlide].title }}</p>

      <div class="mt-20 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button @click="prevSlide" class="w-10 h-10 rounded-full bg-[#0a6cff] flex items-center justify-center hover:bg-[#0057d8] transition-colors">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button @click="nextSlide" @mousedown="pressRight" :class="['w-10 h-10 rounded-full flex items-center justify-center transition-colors', rightPressed ? 'bg-[#0a6cff]' : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700']">
            <svg :class="['w-4 h-4 transition-colors', rightPressed ? 'text-white' : 'text-gray-600 dark:text-gray-300']" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        <div class="flex items-center gap-1.5">
          <span
            v-for="(_, i) in limitedSlides"
            :key="i"
            class="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer"
            :class="i === currentSlide ? 'bg-[#ff5533] scale-110' : 'bg-gray-400/50 dark:bg-gray-500/50'"
            @click="goToSlide(i)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
