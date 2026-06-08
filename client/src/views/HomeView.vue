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
import ExperienceCard from "../components/cards/ExperienceCard.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useLocaleStore } from "../stores/localeStore.js";
import { useRecentlyViewed } from "../composables/useRecentlyViewed.js";

const localeStore = useLocaleStore();
const router = useRouter();
const { recentlyViewed } = useRecentlyViewed();

onMounted(() => { document.title = localeStore.t("home.title"); });
</script>

<template>
  <main>
    <HeroSection />
    <Container>
      <TrendingSearches />
      <CategoriesSection />
      <ThingsToDoSection />
      <AttractionsSection />
      <section v-if="recentlyViewed.length" class="py-10">
        <h2 class="text-[22px] font-bold text-[#0b2343] mb-6">{{ localeStore.t("home.recentlyViewed") }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ExperienceCard v-for="exp in recentlyViewed.slice(0, 8)" :key="exp.id" :item="exp" />
        </div>
      </section>
      <TrustBar />
      <ExperiencesSection />
      <WhyBookSection />
      <NewsletterSection />
    </Container>
  </main>
</template>
