<script setup>
import { Star } from "lucide-vue-next";

defineProps({
  rating: Number,
  reviews: Number,
});

const reviewItems = [
  { name: "Sarah M.", text: "Absolutely incredible experience! The guide was knowledgeable and the views were breathtaking.", rating: 5 },
  { name: "James K.", text: "Well organized and great value for money. Would definitely recommend to friends.", rating: 5 },
  { name: "Elena R.", text: "A highlight of our trip. The skip-the-line access saved us hours of waiting.", rating: 4 },
];
</script>

<template>
  <div class="mt-16">
    <h2 class="text-[24px] font-bold tracking-[-0.3px] text-[#0b2343]" style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      Customer reviews
    </h2>

    <div class="mt-6 p-6 border border-gray-200 rounded-3xl">
      <div class="flex items-center gap-3">
        <span class="text-3xl font-black">{{ rating }}</span>
        <div class="flex gap-0.5">
          <Star v-for="i in 5" :key="i" :size="22" class="text-yellow-500 fill-yellow-500" :class="i > Math.round(rating) ? 'opacity-30' : ''" />
        </div>
      </div>
      <p class="mt-2 text-gray-500">Based on {{ reviews }} reviews</p>
    </div>

    <div class="mt-6 space-y-4">
      <div v-for="(review, i) in reviewItems" :key="i" class="p-5 border border-gray-200 rounded-2xl">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-[#0b2343] text-white flex items-center justify-center text-[13px] font-bold">
            {{ review.name.charAt(0) }}
          </div>
          <span class="font-semibold text-[14px] text-[#0b2343]">{{ review.name }}</span>
          <div class="flex gap-0.5 ml-2">
            <Star v-for="j in review.rating" :key="j" :size="14" class="text-yellow-500 fill-yellow-500" />
          </div>
        </div>
        <p class="mt-2 text-[14px] text-gray-600 leading-relaxed">{{ review.text }}</p>
      </div>
    </div>
  </div>
</template>
