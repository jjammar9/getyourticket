<script setup>
import { thingsToDoCards } from "../../data/homeData";
import Card from "../UI/Card.vue";
import SectionTitle from "../UI/SectionTitle.vue";
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
