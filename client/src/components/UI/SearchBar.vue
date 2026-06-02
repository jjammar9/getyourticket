<script setup>
import { ref } from "vue";
import Input from "./Input.vue";
import Button from "./Button.vue";

const search = ref("");
</script>

<template>
  <div class="bg-white rounded-full shadow-2xl p-1.5 w-full">
    <div class="flex items-center gap-0">
      <div class="pl-5 pr-2 text-gray-400 shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <Input v-model="search" placeholder="Find places and things to do" />
      <div class="pr-1.5">
        <Button class="px-8 py-3.5 text-[17px]"> Search </Button>
      </div>
    </div>
  </div>
</template>
