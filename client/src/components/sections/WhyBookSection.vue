<script setup>
import { whyBookData } from "../../data/whyBookData.js";
import WhyBookCard from "../cards/WhyBookCard.vue";
import fadeIn from "../../directives/fadeIn.js";
</script>

<template>
  <section v-fade-in class="py-16">
    <h2 class="text-[32px] font-bold text-[#0b2343] dark:text-white text-center mb-10">
      Why book with GetYourGuide?
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[960px] mx-auto">
      <WhyBookCard v-for="item in whyBookData" :key="item.title" :item="item" />
    </div>
  </section>
</template>
