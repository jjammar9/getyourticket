<script setup>
import Container from "../components/ui/Container.vue";
import HeroSection from "../components/sections/HeroSection.vue";
import ThingsToDoSection from "../components/sections/ThingsToDoSection.vue";
import AttractionsSection from "../components/sections/AttractionsSection.vue";
import ExperiencesSection from "../components/sections/ExperiencesSection.vue";
import WhyBookSection from "../components/sections/WhyBookSection.vue";
</script>

<template>
  <main>
    <HeroSection />
    <Container>
      <ThingsToDoSection />
      <AttractionsSection />
      <ExperiencesSection />
      <WhyBookSection />
    </Container>
  </main>
</template>
