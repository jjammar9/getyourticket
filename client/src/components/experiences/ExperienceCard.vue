<script setup>
import { Heart, Star } from "lucide-vue-next";

defineProps({
  item: Object,
});
</script>

<template>
  <div
    class="bg-white rounded-[18px] border border-gray-200 overflow-hidden cursor-pointer group flex flex-col h-full hover:shadow-md transition"
  >
    <!-- IMAGE -->
    <div class="relative h-[195px] overflow-hidden">
      <img
        :src="item.image"
        :alt="item.title"
        class="w-full h-full object-cover group-hover:scale-[1.02] transition duration-300"
      />

      <!-- BADGE -->
      <div
        class="absolute top-3 left-3 bg-[#0b2343] text-white text-[11px] font-bold px-3 py-1 rounded-[10px] leading-none"
      >
        {{ item.badge }}
      </div>

      <!-- HEART -->
      <button
        class="absolute top-3 right-3 w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center"
      >
        <Heart :size="20" stroke-width="2" class="text-[#0b2343]" />
      </button>

      <!-- ORANGE LINE -->
      <div class="absolute bottom-0 left-0 w-full h-[5px] bg-[#ff5a1f]"></div>
    </div>

    <!-- CONTENT -->
    <div class="px-4 pt-1 pb-3 flex flex-col flex-1">
      <!-- LOCATION -->
      <p
        class="text-[14px] font-medium text-[#52607a] leading-snug min-h-[40px]"
      >
        {{ item.location }} • {{ item.category }}
      </p>

      <!-- TITLE -->
      <h3
        class="mt-1 text-[17px] leading-[1.25] font-bold text-[#0b2343] line-clamp-3 min-h-[66px]"
      >
        {{ item.title }}
      </h3>

      <!-- META -->
      <p class="mt-2 text-[14px] text-[#52607a] min-h-[22px]">
        {{ item.duration }}
        <span v-if="item.extras"> • {{ item.extras }}</span>
      </p>

      <!-- BOTTOM -->
      <div class="mt-auto pt-5 flex items-end justify-between">
        <div class="flex items-center gap-1.5">
          <Star
            :size="16"
            fill="currentColor"
            stroke-width="0"
            class="text-[#0b2343]"
          />
          <span class="text-[15px] font-bold text-[#0b2343]">
            {{ item.rating }}
          </span>
          <span class="text-[14px] text-[#6f7b90]"> ({{ item.reviews }}) </span>
        </div>

        <div class="text-right leading-tight">
          <p
            v-if="item.oldPrice"
            class="text-[13px] text-[#8b95a8] line-through"
          >
            From €{{ item.oldPrice }}
          </p>

          <p class="text-[22px] font-bold text-[#ff3b30]">€{{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
