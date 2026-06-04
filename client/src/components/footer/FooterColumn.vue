<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  title: String,
  links: Array,
});

function goTo(link) {
  if (link.to && link.to !== "#") {
    router.push(link.to);
  }
}
</script>

<template>
  <div>
    <p class="text-[15px] font-bold mb-5" style="font-family: var(--font-display);">
      {{ title }}
    </p>

    <div class="flex flex-col gap-3">
      <button
        v-for="(link, index) in links"
        :key="index"
        class="text-left text-[14px] text-white underline transition-all cursor-pointer bg-transparent border-0 p-0"
        @click="goTo(link)"
      >
        {{ link.name }}
      </button>
    </div>
  </div>
</template>
