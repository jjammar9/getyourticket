<script setup>
defineProps({
  title: String,
  subtitle: String,
});
</script>

<template>
  <div class="mb-2">
    <h2 class="text-[30px] font-bold text-[#0f2147]">
      {{ title }}
    </h2>

    <p v-if="subtitle" class="text-gray-500 text-lg mt-2">
      {{ subtitle }}
    </p>
  </div>
</template>
