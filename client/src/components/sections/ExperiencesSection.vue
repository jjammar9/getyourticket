<script setup>
import ExperienceCard from "../cards/ExperienceCard.vue";

import Container from "../ui/Container.vue";
import SectionTitle from "../ui/SectionTitle.vue";

import { experiencesData } from "../../data/experiencesData.js";
</script>

<template>
  <section class="py-20">
    <Container>
      <SectionTitle title="Popular experiences" />

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <ExperienceCard
          v-for="item in experiencesData"
          :key="item.id"
          :item="item"
        />
      </div>
    </Container>
  </section>
</template>
