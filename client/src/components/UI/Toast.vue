<script setup>
import { X } from "lucide-vue-next";

defineProps({
  message: { type: String, default: "" },
});

const emit = defineEmits(["dismiss"]);
</script>

<template>
  <Teleport to="body">
    <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] animate-fade-in-up">
      <div class="bg-[#0b2343] text-white px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-4 text-[15px] font-medium">
        {{ message }}
        <button @click="emit('dismiss')" class="text-white/60 hover:text-white">
          <X :size="18" />
        </button>
      </div>
    </div>
  </Teleport>
</template>
