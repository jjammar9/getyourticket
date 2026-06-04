<script setup>
import { ref, watch } from "vue";
import { X, ChevronLeft, ChevronRight } from "lucide-vue-next";

const props = defineProps({
  images: { type: Array, default: () => [] },
  initialIndex: { type: Number, default: 0 },
  open: { type: Boolean, default: false },
});

const emit = defineEmits(["close"]);

const currentIndex = ref(props.initialIndex);

watch(
  () => props.open,
  (val) => {
    if (val) currentIndex.value = props.initialIndex;
  }
);

function prev() {
  if (currentIndex.value > 0) currentIndex.value--;
}

function next() {
  if (currentIndex.value < props.images.length - 1) currentIndex.value++;
}

function onBackdropClick(e) {
  if (e.target === e.currentTarget) emit("close");
}

function onKeydown(e) {
  if (!props.open) return;
  if (e.key === "Escape") emit("close");
  if (e.key === "ArrowLeft") prev();
  if (e.key === "ArrowRight") next();
}

onMounted(() => {
  document.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", onKeydown);
});

import { onMounted, onUnmounted } from "vue";
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
      @click="onBackdropClick"
    >
      <button
        @click="emit('close')"
        class="absolute top-4 right-4 text-white/70 hover:text-white z-10"
      >
        <X :size="28" />
      </button>

      <div class="relative flex items-center gap-4 px-4 max-w-5xl w-full">
        <button
          v-if="currentIndex > 0"
          @click="prev"
          class="text-white/70 hover:text-white shrink-0"
        >
          <ChevronLeft :size="40" />
        </button>

        <div class="flex-1 flex flex-col items-center gap-3">
          <img
            :src="images[currentIndex]"
            :alt="`Photo ${currentIndex + 1}`"
            class="max-h-[80vh] w-full object-contain rounded-lg"
          />
          <span class="text-white/60 text-sm">
            {{ currentIndex + 1 }} / {{ images.length }}
          </span>
        </div>

        <button
          v-if="currentIndex < images.length - 1"
          @click="next"
          class="text-white/70 hover:text-white shrink-0"
        >
          <ChevronRight :size="40" />
        </button>
      </div>
    </div>
  </Teleport>
</template>
