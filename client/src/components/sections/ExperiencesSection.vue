<script setup>
import ExperienceCard from "../cards/ExperienceCard.vue";
import SectionTitle from "../ui/SectionTitle.vue";
import { experiencesData } from "../../data/experiencesData.js";
import fadeIn from "../../directives/fadeIn.js";
</script>

<template>
  <section v-fade-in class="py-10">
    <SectionTitle title="Popular experiences" viewAllTo="/experiences" />

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
      <ExperienceCard
        v-for="item in experiencesData"
        :key="item.id"
        :item="item"
      />
    </div>
  </section>
</template>
