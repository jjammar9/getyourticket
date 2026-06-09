<script setup>
defineProps({
  class: { type: String, default: "" },
});
</script>

<template>
  <div
    :class="class"
    class="rounded-xl bg-gray-200 animate-skeleton-pulse"
  />
</template>
