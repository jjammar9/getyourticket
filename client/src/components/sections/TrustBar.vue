<template>
  <section class="py-10 border-y border-[#e8edf5] dark:border-gray-700">
    <div class="grid grid-cols-3 gap-8">
      <div class="text-center">
        <p class="text-[28px] font-extrabold text-[#0b2343] dark:text-white">4.5M+</p>
        <p class="text-[14px] font-medium text-[#6d788d] dark:text-gray-400 mt-1">{{ localeStore.t("trust.verified") }}</p>
      </div>
      <div class="text-center">
        <p class="text-[28px] font-extrabold text-[#0b2343] dark:text-white">25,000+</p>
        <p class="text-[14px] font-medium text-[#6d788d] dark:text-gray-400 mt-1">{{ localeStore.t("trust.destinations") }}</p>
      </div>
      <div class="text-center">
        <p class="text-[28px] font-extrabold text-[#0b2343] dark:text-white">{{ localeStore.t("trust.freeCancel") }}</p>
        <p class="text-[14px] font-medium text-[#6d788d] dark:text-gray-400 mt-1">{{ localeStore.t("trust.cancelPeriod") }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLocaleStore } from "../../stores/localeStore.js";
const localeStore = useLocaleStore();
</script>
