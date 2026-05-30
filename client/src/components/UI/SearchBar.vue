<script setup>
import { ref } from "vue";
import Input from "./Input.vue";
import Button from "./Button.vue";

const search = ref("");
</script>

<template>
  <div class="bg-white rounded-2xl sm:rounded-full shadow-2xl p-2 w-full">
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
      <Input v-model="search" placeholder="Find places and things to do" />

      <Button class="px-10 py-3 text-[20px]"> Search </Button>
    </div>
  </div>
</template>
