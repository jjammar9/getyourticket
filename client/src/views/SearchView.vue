<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Container from "../components/ui/Container.vue";
import Breadcrumbs from "../components/ui/Breadcrumbs.vue";
import SearchCard from "../components/cards/SearchCard.vue";
import { experiencesData } from "../data/experiencesData.js";

const route = useRoute();

const results = computed(() => {
  const q = (route.query.q || "").toLowerCase().trim();
  if (!q) return [];
  return experiencesData.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
  );
});
</script>

<template>
  <Container>
    <div class="pt-32 pb-12">
      <Breadcrumbs :pages="route.query.q ? [{ label: 'Search' }] : []" />
      <h1 v-if="route.query.q" class="text-[32px] font-bold tracking-[-0.5px] text-[#0b2343] mb-2">
        Search results
      </h1>
      <p v-if="route.query.q" class="text-[16px] font-medium text-gray-500 mb-8">
        {{ results.length }} result{{ results.length === 1 ? "" : "s" }} for "{{ route.query.q }}"
      </p>

      <div v-if="results.length" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <SearchCard v-for="item in results" :key="item.id" :item="item" />
      </div>

      <div v-else-if="route.query.q" class="py-20 text-center">
        <h2 class="text-3xl font-bold text-[#0b2343]">No results found</h2>
        <p class="mt-2 text-gray-500">Try a different search term</p>
      </div>

      <div v-else class="py-20 text-center">
        <h2 class="text-3xl font-bold text-[#0b2343]">Search experiences & attractions</h2>
        <p class="mt-2 text-gray-500">Type above to find top-rated tours worldwide.</p>
      </div>
    </div>
  </Container>
</template>
