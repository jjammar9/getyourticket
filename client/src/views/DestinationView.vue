<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Container from "../components/ui/Container.vue";
import Breadcrumbs from "../components/ui/Breadcrumbs.vue";
import SearchCard from "../components/cards/SearchCard.vue";
import { experiencesData } from "../data/experiencesData.js";

const route = useRoute();

const title = computed(() => {
  return (route.params.slug || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
});

function toSlug(str) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

const experiences = computed(() => {
  const slug = (route.params.slug || "").toLowerCase();
  return experiencesData.filter(
    (item) => toSlug(item.location) === slug
  );
});

const breadcrumbs = computed(() => [
  { label: "Destinations" },
  { label: title.value },
]);
</script>

<template>
  <Container>
    <div class="pt-32 pb-12">
      <Breadcrumbs :pages="breadcrumbs" />
      <h1 class="text-[32px] font-bold tracking-[-0.5px] text-[#0b2343] mb-8">
        {{ title }}
      </h1>

      <div v-if="experiences.length" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <SearchCard v-for="item in experiences" :key="item.id" :item="item" />
      </div>

      <div v-else class="py-20 text-center">
        <h2 class="text-3xl font-bold text-[#0b2343]">No experiences found</h2>
        <p class="mt-2 text-gray-500">No experiences available for this destination yet.</p>
      </div>
    </div>
  </Container>
</template>
