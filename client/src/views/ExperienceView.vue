<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useBookingStore } from "../stores/bookingStore.js";
import SkeletonBlock from "../components/ui/SkeletonBlock.vue";

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
import { getListingById } from "../api.js";

const route = useRoute();
const bookingStore = useBookingStore();
const loading = ref(true);
const experience = ref(null);

onMounted(async () => {
  try {
    experience.value = await getListingById(Number(route.params.id));
  } catch (e) {
    console.error("Failed to load experience", e);
  }
  loading.value = false;
});

watch(experience, (exp) => {
  if (exp) document.title = `${exp.title} - GetYourTicket`;
}, { immediate: true });

function handleBook(exp) {
  if (exp) bookingStore.addBooking(exp);
}
</script>

<template>
  <Container>
    <div v-if="loading" class="pt-32 pb-12 space-y-6">
      <SkeletonBlock class="h-4 w-64" />
      <SkeletonBlock class="h-10 w-96" />
      <SkeletonBlock class="h-[420px] w-full" />
      <div class="grid grid-cols-3 gap-6">
        <SkeletonBlock class="h-40" />
        <SkeletonBlock class="h-40" />
        <SkeletonBlock class="h-40" />
      </div>
    </div>

    <div v-else-if="experience" class="pt-32 pb-12">
      <!-- BREADCRUMBS -->
      <ExperienceBreadcrumbs :location="experience.location" />

      <!-- HEADER -->
      <ExperienceHeader :experience="experience" />

      <!-- GALLERY + BOOKING -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div class="md:col-span-8">
          <ExperienceGallery :images="experience.images" />
        </div>

        <div class="md:col-span-4">
          <ExperienceBookingCard :experience="experience" @book="handleBook" />
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

    <div v-else-if="!loading" class="py-20 text-center">
      <h1 class="text-5xl font-black">Experience Not Found</h1>
    </div>
  </Container>
</template>
