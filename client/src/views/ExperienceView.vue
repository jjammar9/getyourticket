<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import Container from "../components/ui/Container.vue";

import ExperienceBreadcrumbs from "../components/experience/ExperienceBreadcrumbs.vue";
import ExperienceGallery from "../components/experience/ExperienceGallery.vue";
import ExperienceHeader from "../components/experience/ExperienceHeader.vue";
import ExperienceBookingCard from "../components/experience/ExperienceBookingCard.vue";
import ExperienceTrustBar from "../components/experience/ExperienceTrustBar.vue";
import ExperienceDescription from "../components/experience/ExperienceDescription.vue";
import ExperienceHighlights from "../components/experience/ExperienceHighlights.vue";
import ExperienceIncluded from "../components/experience/ExperienceIncluded.vue";
import ExperienceMeetingPoint from "../components/experience/ExperienceMeetingPoint.vue";
import ExperienceReviews from "../components/experience/ExperienceReviews.vue";
import SearchBar from "../components/ui/SearchBar.vue";
import { experiencesData } from "../data/experiencesData.js";

const route = useRoute();

const experience = computed(() => {
  return experiencesData.find((item) => item.id === Number(route.params.id));
});
</script>

<template>
  <Container>
    <div v-if="experience" class="py-12">
      <!-- BREADCRUMBS -->
      <ExperienceBreadcrumbs :location="experience.location" />

      <!-- HEADER -->
      <ExperienceHeader :experience="experience" />

      <!-- GALLERY + BOOKING -->
      <div class="mt-8 grid grid-cols-12 gap-8">
        <div class="col-span-8">
          <ExperienceGallery :experience="experience" />
        </div>

        <div class="col-span-4">
          <ExperienceBookingCard :experience="experience" />
        </div>
      </div>

      <!-- TRUST BAR -->
      <ExperienceTrustBar />

      <!-- CONTENT -->
      <div class="mt-14 max-w-4xl">
        <ExperienceDescription :description="experience.description" />

        <ExperienceHighlights :highlights="experience.highlights" />

        <ExperienceIncluded :included="experience.included" />

        <ExperienceMeetingPoint :meetingPoint="experience.meetingPoint" />

        <ExperienceReviews
          :rating="experience.rating"
          :reviews="experience.reviews"
        />
      </div>
    </div>

    <div v-else class="py-20 text-center">
      <h1 class="text-5xl font-black">Experience Not Found</h1>
    </div>
  </Container>
</template>
