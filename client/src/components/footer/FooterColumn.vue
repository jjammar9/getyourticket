<script setup>
defineProps({
  title: String,
  links: Array,
});
</script>

<template>
  <div>
    <p class="text-[15px] font-bold mb-3">{{ title }}</p>
    <div class="flex flex-col gap-[9px]">
      <a
        v-for="(link, index) in links"
        :key="index"
        href="#"
        class="text-[14px] font-normal text-white underline hover:no-underline transition-all"
        >{{ link }}</a
      >
    </div>
  </div>
</template>
