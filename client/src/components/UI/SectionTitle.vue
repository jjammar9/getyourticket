<script setup>
defineProps({
  title: String,
  subtitle: String,
});
</script>

<template>
  <div class="mb-10">
    <h2
      class="text-[52px] font-black tracking-[-2px] text-[#0b2343] leading-tight"
    >
      {{ title }}
    </h2>

    <p v-if="subtitle" class="text-gray-500 text-[18px] mt-3 font-medium">
      {{ subtitle }}
    </p>
  </div>
</template>
