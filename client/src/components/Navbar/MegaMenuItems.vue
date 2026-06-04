<script setup>
import { useRouter } from "vue-router";
import { handleImageError } from "../../constants/placeholder.js";

const router = useRouter();

const props = defineProps({
  currentItems: Array,
});

function toSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 60);
}

function goToItem(item) {
  router.push(`/destination/${toSlug(item.title)}`);
}
</script>

<template>
  <div class="grid grid-cols-4 gap-x-6 gap-y-2">
    <button v-for="item in currentItems" :key="item.title" @click="goToItem(item)">
      <div
        class="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-sky-100 dark:hover:bg-gray-700 transition text-left"
      >
        <img
          :src="item.image"
          :alt="item.title"
          @error="handleImageError"
          class="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <p class="font-medium text-gray-900 dark:text-white text-[15px]">
            {{ item.title }}
          </p>

          <p class="text-[13px] text-gray-500 dark:text-gray-400">
            {{ item.subtitle }}
          </p>
        </div>
      </div>
    </button>
  </div>
</template>
