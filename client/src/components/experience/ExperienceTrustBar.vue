<script setup>
import { useLocaleStore } from "../../stores/localeStore.js";
const localeStore = useLocaleStore();
</script>

<template>
  <div class="mt-8 flex flex-wrap gap-6 border-y border-gray-200 py-5">
    <div class="font-medium text-gray-700 dark:text-gray-300">&check; {{ localeStore.t("expTrust.freeCancel") }}</div>
    <div class="font-medium text-gray-700 dark:text-gray-300">&check; {{ localeStore.t("expTrust.reserveNow") }}</div>
    <div class="font-medium text-gray-700 dark:text-gray-300">&check; {{ localeStore.t("expTrust.instantConfirm") }}</div>
    <div class="font-medium text-gray-700 dark:text-gray-300">&check; {{ localeStore.t("expTrust.liveGuide") }}</div>
  </div>
</template>
