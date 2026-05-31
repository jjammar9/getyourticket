<script setup>
defineProps({
  description: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div v-if="description" class="mt-14">
    <h2 class="text-[32px] font-black tracking-[-1px] text-[#0b2343]">
      About this experience
    </h2>

    <p class="mt-5 text-[16px] leading-8 text-gray-600">
      {{ description }}
    </p>
  </div>
</template>
