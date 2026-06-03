<script setup>
import Card from "../ui/Card.vue";

defineProps({
  item: Object,
});
</script>

<template>
  <Card class="px-10 py-10 flex flex-col items-center text-center border-0 rounded-[28px] cursor-default" style="border: 1px solid #dfe3eb">
    <div class="relative w-[120px] h-[120px]">
      <img :src="item.images[0]" class="absolute top-0 left-0 w-[56px] h-[56px] rounded-2xl object-cover border-4 border-white shadow-sm" />
      <img :src="item.images[1]" class="absolute top-0 right-0 w-[56px] h-[56px] rounded-2xl object-cover border-4 border-white shadow-sm" />
      <img :src="item.images[2]" class="absolute bottom-0 left-0 w-[56px] h-[56px] rounded-2xl object-cover border-4 border-white shadow-sm" />
      <img :src="item.images[3]" class="absolute bottom-0 right-0 w-[56px] h-[56px] rounded-2xl object-cover border-4 border-white shadow-sm" />

      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-[48px] h-[48px] rounded-full bg-[#0b2343] text-white flex items-center justify-center text-[22px] font-bold shadow-xl border-4 border-white">
          {{ item.icon }}
        </div>
      </div>
    </div>

    <h3 class="mt-8 text-[30px] font-extrabold tracking-[-1px] text-[#0b2343] leading-tight">
      {{ item.title }}
    </h3>

    <p class="mt-4 text-[18px] leading-[1.5] text-[#5f6b85] font-medium max-w-[420px]">
      {{ item.description }}
    </p>
  </Card>
</template>
