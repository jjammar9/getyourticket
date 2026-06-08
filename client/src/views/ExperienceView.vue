<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
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
import { getListingById, getReviews, getListings } from "../api.js";
import { useRecentlyViewed } from "../composables/useRecentlyViewed.js";
import ExperienceCard from "../components/cards/ExperienceCard.vue";
import { Share2, Facebook, Twitter, Linkedin } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const bookingStore = useBookingStore();
const { addRecentlyViewed } = useRecentlyViewed();
const loading = ref(true);
const experience = ref(null);
const reviews = ref([]);
const relatedExperiences = ref([]);
const guests = ref(1);
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const selectedDate = ref(tomorrow.toISOString().split("T")[0]);

onMounted(async () => {
  try {
    const expId = Number(route.params.id);
    experience.value = await getListingById(expId);
    if (experience.value) addRecentlyViewed(experience.value);
    reviews.value = await getReviews(expId);
    const all = await getListings();
    if (experience.value && all.length) {
      const sameLocationOrCategory = all.filter(
        (e) =>
          e.id !== experience.value.id &&
          (e.location === experience.value.location ||
            (e.category && experience.value.category && e.category === experience.value.category))
      );
      const shuffled = sameLocationOrCategory.sort(() => Math.random() - 0.5);
      relatedExperiences.value = shuffled.slice(0, 4);
    }
  } catch (e) {
    console.error("Failed to load experience", e);
  }
  loading.value = false;
});

function updateMeta(exp) {
  if (!exp) return;
  document.title = `${exp.title} - GetYourTicket`;
  const setMeta = (name, content) => {
    let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
    if (!el) { el = document.createElement("meta"); document.head.appendChild(el); }
    el.setAttribute(name.includes("og:") ? "property" : "name", name);
    el.setAttribute("content", content);
  };
  setMeta("description", exp.description?.slice(0, 160));
  setMeta("og:title", exp.title);
  setMeta("og:description", exp.description?.slice(0, 160));
  if (exp.image) setMeta("og:image", exp.image);
  setMeta("og:url", window.location.href);
  setMeta("og:type", "website");
}

watch(experience, (exp) => {
  updateMeta(exp);
}, { immediate: true });

function handleBook(exp) {
  if (exp) {
    bookingStore.addBooking({ ...exp, guests: guests.value, date: selectedDate.value });
    router.push("/cart");
  }
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

      <!-- SOCIAL SHARE -->
      <div class="flex items-center gap-3 mt-4 mb-2">
        <span class="text-[13px] font-medium text-gray-500">Share:</span>
        <button @click="window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')" class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"><Facebook :size="16" /></button>
        <button @click="window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(experience.title)}`, '_blank')" class="w-8 h-8 flex items-center justify-center rounded-full bg-sky-100 text-sky-600 hover:bg-sky-200 transition"><Twitter :size="16" /></button>
        <button @click="navigator.clipboard.writeText(window.location.href); alert('Link copied!')" class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition"><Share2 :size="16" /></button>
      </div>

      <!-- GALLERY + BOOKING -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div class="md:col-span-8">
          <ExperienceGallery :images="experience.images" />
        </div>

        <div class="md:col-span-4">
          <ExperienceBookingCard
            :experience="experience"
            :guests="guests"
            :selectedDate="selectedDate"
            @update:guests="guests = $event"
            @update:selectedDate="selectedDate = $event"
            @book="handleBook"
          />
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
          :listing-id="experience.id"
          :rating="experience.rating"
          :reviews-count="experience.reviews"
          :review-items="reviews"
        />
      </div>

      <!-- RELATED EXPERIENCES -->
      <div v-if="relatedExperiences.length" class="mt-16">
        <h2 class="text-[22px] font-bold text-[#0b2343] mb-6">Related Experiences</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ExperienceCard v-for="exp in relatedExperiences" :key="exp.id" :item="exp" />
        </div>
      </div>
    </div>

    <div v-else-if="!loading" class="py-20 text-center">
      <h1 class="text-5xl font-black">Experience Not Found</h1>
    </div>
  </Container>
</template>
