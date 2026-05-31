<script setup>
defineProps({
  location: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="mb-6 text-sm text-gray-500 font-medium">
    Home
    <span class="mx-2">›</span>

    Destinations
    <span class="mx-2">›</span>

    {{ location }}
  </div>
</template>
