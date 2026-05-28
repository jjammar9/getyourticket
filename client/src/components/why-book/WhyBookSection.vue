<script setup>
import SectionTitle from "../UI/SectionTitle.vue";
import WhyBookCard from "./WhyBookCard.vue";
import { whyBookData } from "../../data/whyBookData";
</script>

<template>
  <section class="max-w-7xl mx-auto px-8 py-24">
    <SectionTitle title="Why book with GetYourGuide?" />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
      <WhyBookCard v-for="item in whyBookData" :key="item.title" :item="item" />
    </div>
  </section>
</template>
