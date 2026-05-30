<script setup>
import Container from "../ui/Container.vue";
import SectionTitle from "../ui/SectionTitle.vue";
import WhyBookCard from "../cards/WhyBookCard.vue";

import { whyBookData } from "../../data/whyBookData.js";
</script>

<template>
  <section class="py-24">
    <Container>
      <SectionTitle title="Why book with GetYourGuide?" />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <WhyBookCard
          v-for="item in whyBookData"
          :key="item.title"
          :item="item"
        />
      </div>
    </Container>
  </section>
</template>
