<script setup>
import { useRoute } from "vue-router";
import Container from "../components/ui/Container.vue";

const route = useRoute();
const countryName = route.params.slug
  .replace(/-/g, " ")
  .replace(/\b\w/g, (c) => c.toUpperCase());
</script>

<template>
  <div class="pt-28 pb-16 min-h-[60vh]">
    <Container>
      <div class="flex flex-col items-center justify-center py-20 text-center">
        <div class="w-16 h-16 rounded-full bg-[#fcb034] flex items-center justify-center mb-6">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
          </svg>
        </div>
        <h1 class="text-[32px] font-bold text-[#0b2343] dark:text-white tracking-[-0.5px]">{{ countryName }}</h1>
        <p class="text-gray-500 mt-3 text-[15px]">This page is coming soon. We're curating the best experiences for {{ countryName }}.</p>
        <router-link
          to="/"
          class="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[#0b2343] text-white rounded-full text-[14px] font-semibold hover:bg-[#163d7a] transition-colors"
        >
          Back to Home
        </router-link>
      </div>
    </Container>
  </div>
</template>
