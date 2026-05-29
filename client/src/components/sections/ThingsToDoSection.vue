<script setup>
import { thingsToDoCards } from "../../data/homeData.js";
import Card from "../ui/Card.vue";
import SectionTitle from "../ui/SectionTitle.vue";
</script>

<template>
  <section class="max-w-7xl mx-auto px-8 py-14">
    <div class="mb-8">
      <SectionTitle title="Popular experiences" />
    </div>

    <div class="grid grid-cols-6 gap-5">
      <Card
        v-for="card in thingsToDoCards"
        :key="card.title"
        type="destination"
        :title="card.title"
        :subtitle="card.subtitle"
        :image="card.image"
      />
    </div>
  </section>
</template>
