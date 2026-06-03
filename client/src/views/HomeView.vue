<script setup>
import Container from "../components/ui/Container.vue";
import HeroSection from "../components/sections/HeroSection.vue";
import TrendingSearches from "../components/sections/TrendingSearches.vue";
import CategoriesSection from "../components/sections/CategoriesSection.vue";
import ThingsToDoSection from "../components/sections/ThingsToDoSection.vue";
import AttractionsSection from "../components/sections/AttractionsSection.vue";
import TrustBar from "../components/sections/TrustBar.vue";
import ExperiencesSection from "../components/sections/ExperiencesSection.vue";
import WhyBookSection from "../components/sections/WhyBookSection.vue";
import NewsletterSection from "../components/sections/NewsletterSection.vue";
import BackToTop from "../components/ui/BackToTop.vue";
</script>

<template>
  <main>
    <HeroSection />
    <Container>
      <TrendingSearches />
      <CategoriesSection />
      <ThingsToDoSection />
      <AttractionsSection />
      <TrustBar />
      <ExperiencesSection />
      <WhyBookSection />
      <NewsletterSection />
    </Container>
    <BackToTop />
  </main>
</template>
