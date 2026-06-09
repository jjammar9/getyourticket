<script setup>
import { useLocaleStore } from "../../stores/localeStore.js";
const localeStore = useLocaleStore();
</script>

<template>
  <div class="w-full max-w-[160px]">
    <p class="text-[13px] font-bold mb-3">{{ localeStore.t("footer.mobile") }}</p>

    <div class="flex flex-col gap-3">
      <a href="#">
        <img
          loading="lazy"
          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
          class="w-[135px] h-auto"
          alt="Get it on Google Play"
        />
      </a>

      <a href="#">
        <img
          loading="lazy"
          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
          class="w-[135px] h-auto"
          alt="Download on the App Store"
        />
      </a>
    </div>
  </div>
</template>
