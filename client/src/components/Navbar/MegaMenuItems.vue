<script setup>
defineProps({
  currentItems: Array,
  getImage: Function,
});
</script>

<template>
  <div class="grid grid-cols-4 gap-x-6 gap-y-2">
    <button v-for="(item, index) in currentItems" :key="item.title">
      <div
        class="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-sky-100 transition text-left"
      >
        <img
          :src="getImage(index)"
          :alt="item.title"
          class="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <p class="font-medium text-gray-900 text-[15px]">
            {{ item.title }}
          </p>

          <p class="text-[13px] text-gray-500">
            {{ item.subtitle }}
          </p>
        </div>
      </div>
    </button>
  </div>
</template>
