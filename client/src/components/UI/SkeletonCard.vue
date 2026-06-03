<script setup>
defineProps({
  type: {
    type: String,
    default: "experience",
  },
});
</script>

<template>
  <div class="rounded-[18px] border border-[#d9dee8] overflow-hidden animate-pulse">
    <div class="bg-[#e8edf5] h-[175px]" />

    <div class="p-4 space-y-3">
      <div class="bg-[#e8edf5] h-3 w-1/2 rounded" />
      <div class="bg-[#e8edf5] h-4 w-full rounded" />
      <div class="bg-[#e8edf5] h-4 w-3/4 rounded" />
      <div class="bg-[#e8edf5] h-3 w-1/3 rounded" />
      <div class="flex justify-between pt-2">
        <div class="bg-[#e8edf5] h-4 w-1/4 rounded" />
        <div class="bg-[#e8edf5] h-5 w-1/5 rounded" />
      </div>
    </div>
  </div>
</template>
