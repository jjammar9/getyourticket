<script setup>
import { ref } from "vue";
import PhotoLightbox from "../ui/PhotoLightbox.vue";

const props = defineProps({
  images: { type: Array, default: () => [] },
});

const lightboxOpen = ref(false);
const lightboxIndex = ref(0);

function openLightbox(index) {
  lightboxIndex.value = index;
  lightboxOpen.value = true;
}
</script>

<template>
  <div class="relative">
    <div v-if="images.length === 1" class="w-full">
      <img
        loading="lazy"
        :src="images[0]"
        alt="Experience"
        class="w-full h-[420px] object-cover rounded-xl cursor-pointer"
        @click="openLightbox(0)"
      />
    </div>

    <div
      v-else-if="images.length === 2"
      class="grid grid-cols-2 gap-2 h-[420px]"
    >
      <img
        loading="lazy"
        v-for="(img, i) in images"
        :key="i"
        :src="img"
        :alt="`Photo ${i + 1}`"
        class="w-full h-full object-cover rounded-xl cursor-pointer"
        @click="openLightbox(i)"
      />
    </div>

    <div v-else class="grid grid-cols-4 grid-rows-2 gap-2 h-[420px]">
      <img
        loading="lazy"
        :src="images[0]"
        alt="Photo 1"
        class="col-span-2 row-span-2 w-full h-full object-cover rounded-l-xl cursor-pointer"
        @click="openLightbox(0)"
      />
      <img
        loading="lazy"
        v-for="(img, i) in images.slice(1, 4)"
        :key="i"
        :src="img"
        :alt="`Photo ${i + 2}`"
        class="w-full h-full object-cover cursor-pointer"
        :class="[i === 0 ? 'rounded-tr-xl' : '', i === images.slice(1, 4).length - 1 ? 'rounded-br-xl' : '']"
        @click="openLightbox(i + 1)"
      />
      <button
        v-if="images.length > 4"
        @click="openLightbox(4)"
        class="absolute bottom-4 right-4 bg-white text-[14px] font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition"
      >
        See all photos
      </button>
    </div>

    <PhotoLightbox
      :images="images"
      :initialIndex="lightboxIndex"
      :open="lightboxOpen"
      @close="lightboxOpen = false"
    />
  </div>
</template>
