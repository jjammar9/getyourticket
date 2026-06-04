<script setup>
defineProps({
  item: Object,
});
</script>

<template>
  <div class="flex flex-col items-center text-center">
    <div class="w-[52px] h-[52px] rounded-full bg-[#0b2343] text-white flex items-center justify-center text-[24px] font-bold">
      {{ item.icon }}
    </div>

    <h3 class="mt-4 text-[20px] font-extrabold tracking-[-0.5px] text-[#0b2343] dark:text-white leading-tight">
      {{ item.title }}
    </h3>

    <p class="mt-2 text-[14px] leading-[1.5] text-[#5f6b85] dark:text-gray-400 font-medium max-w-[320px]">
      {{ item.description }}
    </p>
  </div>
</template>
