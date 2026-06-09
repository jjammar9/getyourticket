<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
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
  currentIndex.value =
    (currentIndex.value - 1 + props.images.length) % props.images.length;
}

function next() {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
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
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      @click="onBackdropClick"
    >
      <button
        @click="emit('close')"
        class="absolute top-4 right-4 text-white/70 hover:text-white z-10"
      >
        <X :size="28" />
      </button>

      <button
        @click="prev"
        class="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10"
      >
        <ChevronLeft :size="40" />
      </button>

      <Transition name="fade" mode="out-in">
        <img
          :key="currentIndex"
          loading="lazy"
          :src="images[currentIndex]"
          :alt="`Photo ${currentIndex + 1}`"
          class="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
        />
      </Transition>

      <button
        @click="next"
        class="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10"
      >
        <ChevronRight :size="40" />
      </button>

      <span
        class="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm"
      >
        {{ currentIndex + 1 }} / {{ images.length }}
      </span>
    </div>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
