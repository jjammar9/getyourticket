<script setup>
import { thingsToDoCards } from "../../data/homeData.js";
import Card from "../ui/Card.vue";
import SectionTitle from "../ui/SectionTitle.vue";
</script>

<template>
  <section class="py-14">
    <SectionTitle title="Things to do wherever you're going" />

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
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
