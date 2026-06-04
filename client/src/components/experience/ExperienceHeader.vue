<script setup>
import { Star } from "lucide-vue-next";

defineProps({
  experience: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div>
    <p
      v-if="experience.badge"
      class="inline-flex bg-[#0b2343] text-white text-[12px] font-bold px-4 py-2 rounded-full"
    >
      {{ experience.badge }}
    </p>

    <h1
      class="mt-5 text-[40px] font-bold tracking-[-0.5px] leading-tight text-[#0b2343]"

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
      <span class="flex items-center gap-1 text-[20px] font-bold">
        <Star :size="22" class="text-yellow-500 fill-yellow-500" /> {{ experience.rating }}
      </span>
      <span class="text-gray-500"> ({{ experience.reviews }} reviews) </span>
    </div>
  </div>
</template>
