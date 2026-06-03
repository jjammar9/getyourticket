<script setup>
import SectionTitle from "../ui/SectionTitle.vue";
import WhyBookCard from "../cards/WhyBookCard.vue";
import { whyBookData } from "../../data/whyBookData.js";
import fadeIn from "../../directives/fadeIn.js";
</script>

<template>
  <section v-fade-in class="py-10">
    <SectionTitle title="Why book with GetYourGuide?" />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <WhyBookCard v-for="item in whyBookData" :key="item.title" :item="item" />
    </div>
  </section>
</template>
