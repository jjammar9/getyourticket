<script setup>
import ExperienceCard from "./ExperienceCard.vue";

import { experiencesData } from "../../data/experiencesData.js";
import SectionTitle from "../UI/SectionTitle.vue";
</script>

<template>
  <section class="max-w-7xl mx-auto px-8 py-20">
    <SectionTitle title="Popular experiences" />

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
      <ExperienceCard
        v-for="item in experiencesData"
        :key="item.id"
        :item="item"
      />
    </div>
  </section>
</template>
