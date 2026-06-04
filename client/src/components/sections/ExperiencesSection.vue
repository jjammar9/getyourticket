<script setup>
import { computed } from "vue";
import ExperienceCard from "../cards/ExperienceCard.vue";
import SectionTitle from "../ui/SectionTitle.vue";
import { experiencesData } from "../../data/experiencesData.js";
import fadeIn from "../../directives/fadeIn.js";

const uniqueImageExperiences = computed(() => {
  const seen = new Set();
  return experiencesData.filter((item) => {
    if (seen.has(item.image)) return false;
    seen.add(item.image);
    return true;
  });
});
</script>

<template>
  <section v-fade-in class="py-10">
    <SectionTitle title="Popular experiences" viewAllTo="/experiences" />

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
      <ExperienceCard
        v-for="item in uniqueImageExperiences.slice(0, 12)"
        :key="item.id"
        :item="item"
      />
    </div>
  </section>
</template>
