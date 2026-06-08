<script setup>
defineProps({
  count: { type: Number, default: 1 },
});
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <div v-for="n in count" :key="n" class="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <div class="w-full h-44 bg-gray-200 animate-skeleton-pulse" />
      <div class="p-4 space-y-3">
        <div class="h-3 w-16 rounded-full bg-gray-200 animate-skeleton-pulse" />
        <div class="h-5 w-3/4 rounded bg-gray-200 animate-skeleton-pulse" />
        <div class="h-4 w-1/2 rounded bg-gray-200 animate-skeleton-pulse" />
        <div class="flex justify-between items-center pt-2">
          <div class="h-6 w-20 rounded bg-gray-200 animate-skeleton-pulse" />
          <div class="h-4 w-16 rounded bg-gray-200 animate-skeleton-pulse" />
        </div>
      </div>
    </div>
  </div>
</template>
