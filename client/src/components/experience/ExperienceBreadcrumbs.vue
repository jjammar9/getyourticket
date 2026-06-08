<script setup>
import { useRouter } from "vue-router";
import { useLocaleStore } from "../../stores/localeStore.js";

defineProps({ location: { type: String, default: "" } });
const router = useRouter();
const localeStore = useLocaleStore();
</script>

<template>
  <div class="flex items-center gap-1.5 text-[13px] font-medium text-[#59657b] dark:text-gray-400 flex-wrap mb-3">
    <button @click="router.push('/')" class="hover:text-[#0b2343] dark:hover:text-white transition-colors cursor-pointer">{{ localeStore.t("crumb.home") }}</button>
    <span class="text-gray-300 dark:text-gray-600">/</span>
    <button @click="router.push('/experiences')" class="hover:text-[#0b2343] dark:hover:text-white transition-colors cursor-pointer">{{ localeStore.t("crumb.experiences") }}</button>
    <span class="text-gray-300 dark:text-gray-600">/</span>
    <span class="text-[#0b2343] dark:text-white font-semibold truncate max-w-[160px]">{{ location }}</span>
  </div>
</template>
