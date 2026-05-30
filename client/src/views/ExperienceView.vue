<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import { experiencesData } from "../data/experiencesData.js";

const route = useRoute();

const experience = computed(() => {
  return experiencesData.find((item) => item.id === Number(route.params.id));
});
</script>

<template>
  <div v-if="experience" class="max-w-7xl mx-auto px-8 py-12">
    <!-- HERO IMAGE -->
    <img
      :src="experience.image"
      :alt="experience.title"
      class="w-full h-[500px] object-cover rounded-3xl"
    />

    <!-- CONTENT + BOOKING -->
    <div class="mt-10 grid grid-cols-12 gap-10">
      <!-- LEFT -->
      <div class="col-span-8">
        <p
          class="inline-flex bg-[#0b2343] text-white text-[12px] font-bold px-4 py-2 rounded-full"
        >
          {{ experience.badge }}
        </p>

        <h1
          class="mt-5 text-[52px] font-black tracking-[-2px] leading-tight text-[#0b2343]"
        >
          {{ experience.title }}
        </h1>

        <p class="mt-5 text-[18px] text-gray-600 font-medium">
          {{ experience.location }}
          •
          {{ experience.category }}
        </p>

        <p class="mt-2 text-[16px] text-gray-500">
          {{ experience.duration }}

          <span v-if="experience.extras"> • {{ experience.extras }} </span>
        </p>

        <div class="mt-6 flex items-center gap-3">
          <span class="text-[20px] font-bold">
            ⭐ {{ experience.rating }}
          </span>

          <span class="text-gray-500">
            ({{ experience.reviews }} reviews)
          </span>
        </div>

        <!-- DESCRIPTION -->
        <div class="mt-14">
          <h2 class="text-[32px] font-black tracking-[-1px] text-[#0b2343]">
            About this experience
          </h2>

          <p class="mt-5 text-[16px] leading-8 text-gray-600">
            {{ experience.description }}
          </p>
        </div>

        <!-- HIGHLIGHTS -->
        <div v-if="experience.highlights?.length" class="mt-14">
          <h2 class="text-[32px] font-black tracking-[-1px] text-[#0b2343]">
            Highlights
          </h2>

          <ul class="mt-5 space-y-4">
            <li
              v-for="highlight in experience.highlights"
              :key="highlight"
              class="flex items-start gap-3 text-gray-700"
            >
              <span class="font-bold text-green-600">✓</span>
              <span>{{ highlight }}</span>
            </li>
          </ul>
        </div>

        <!-- INCLUDED -->
        <div v-if="experience.included?.length" class="mt-14">
          <h2 class="text-[32px] font-black tracking-[-1px] text-[#0b2343]">
            What's included
          </h2>

          <ul class="mt-5 space-y-4">
            <li
              v-for="item in experience.included"
              :key="item"
              class="flex items-start gap-3 text-gray-700"
            >
              <span class="font-bold text-green-600">✓</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <!-- MEETING POINT -->
        <div v-if="experience.meetingPoint" class="mt-14">
          <h2 class="text-[32px] font-black tracking-[-1px] text-[#0b2343]">
            Meeting point
          </h2>

          <p class="mt-5 text-[16px] leading-8 text-gray-600">
            {{ experience.meetingPoint }}
          </p>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="col-span-4">
        <div
          class="sticky top-8 border border-gray-200 rounded-3xl p-8 shadow-sm bg-white"
        >
          <p
            v-if="experience.oldPrice"
            class="text-[16px] text-gray-400 line-through"
          >
            €{{ experience.oldPrice }}
          </p>

          <p class="text-[52px] font-black leading-none text-[#e53935]">
            €{{ experience.price }}
          </p>

          <p class="mt-2 text-gray-500">per person</p>

          <button
            class="w-full mt-8 bg-[#0b2343] hover:bg-[#081a33] text-white font-bold py-4 rounded-2xl transition"
          >
            Book now
          </button>

          <div class="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-500">
            <p>✓ Free cancellation</p>
            <p class="mt-2">✓ Reserve now & pay later</p>
            <p class="mt-2">✓ Instant confirmation</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="py-20 text-center">
    <h1 class="text-5xl font-black">Experience Not Found</h1>
  </div>
</template>
