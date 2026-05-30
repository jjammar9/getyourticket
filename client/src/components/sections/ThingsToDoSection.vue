<script setup>
import { thingsToDoCards } from "../../data/homeData.js";

import Container from "../ui/Container.vue";
import Card from "../ui/Card.vue";
import SectionTitle from "../ui/SectionTitle.vue";
</script>

<template>
  <section class="py-14">
    <Container>
      <SectionTitle title="Popular experiences" />

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
    </Container>
  </section>
</template>
