<script setup>
import { useRouter } from "vue-router";

defineProps({
  location: {
    type: String,
    default: "",
  },
});

const router = useRouter();
</script>

<template>
  <div class="mb-6 text-sm text-gray-500 font-medium flex items-center flex-wrap">
    <button @click="router.push('/')" class="hover:text-[#0b2343] transition-colors cursor-pointer">
      Home
    </button>
    <span class="mx-2">›</span>
    <button @click="router.push('/experiences')" class="hover:text-[#0b2343] transition-colors cursor-pointer">
      Experiences
    </button>
    <span class="mx-2">›</span>
    <span class="text-gray-700 font-semibold">{{ location }}</span>
  </div>
</template>
