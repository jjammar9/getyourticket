<script setup>
import { ref, onMounted } from "vue";
import Container from "../components/ui/Container.vue";
import Breadcrumbs from "../components/ui/Breadcrumbs.vue";
import SearchCard from "../components/cards/SearchCard.vue";
import { getListings } from "../api.js";

const experiencesData = ref([]);

onMounted(async () => {
  try {
    experiencesData.value = await getListings();
  } catch (e) {
    console.error("Failed to load experiences", e);
  }
});
</script>

<template>
  <Container>
    <div class="pt-32 pb-12">
      <Breadcrumbs :pages="[{ label: 'Experiences' }]" />
      <h1 class="text-[32px] font-bold tracking-[-0.5px] text-[#0b2343]">
        Experiences
      </h1>
      <p class="text-[16px] font-medium text-gray-500 mt-2 mb-8">
        {{ experiencesData.length }} top-rated tours & activities
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <SearchCard v-for="item in experiencesData" :key="item.id" :item="item" />
      </div>
    </div>
  </Container>
</template>
