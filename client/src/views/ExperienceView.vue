<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBookingStore } from "../stores/bookingStore.js";
import SkeletonBlock from "../components/ui/SkeletonBlock.vue";
import Container from "../components/ui/Container.vue";
import ExperienceBreadcrumbs from "../components/experience/ExperienceBreadcrumbs.vue";
import ExperienceReviews from "../components/experience/ExperienceReviews.vue";
import ExperienceCard from "../components/cards/ExperienceCard.vue";
import PhotoLightbox from "../components/ui/PhotoLightbox.vue";
import { getListingById, getReviews, getListings } from "../api.js";
import { useRecentlyViewed } from "../composables/useRecentlyViewed.js";
import { useCurrencyStore } from "../stores/currencyStore.js";
import { useLocaleStore } from "../stores/localeStore.js";
import { Star, ShieldCheck, RotateCcw, CalendarDays, MapPin, Check, Camera, Minus, Plus } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const bookingStore = useBookingStore();
const currencyStore = useCurrencyStore();
const localeStore = useLocaleStore();
const { addRecentlyViewed } = useRecentlyViewed();
const loading = ref(true);
const experience = ref(null);
const reviews = ref([]);
const relatedExperiences = ref([]);
const guests = ref(1);
const lightboxOpen = ref(false);
const lightboxIndex = ref(0);
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
      const same = all.filter(e => e.id !== experience.value.id && (e.location === experience.value.location || (e.category && experience.value.category && e.category === experience.value.category)));
      relatedExperiences.value = same.sort(() => Math.random() - 0.5).slice(0, 4);
    }
  } catch (e) { /* ignore */ }
  loading.value = false;
});

function handleReviewed(r) { reviews.value.unshift(r); if (experience.value) experience.value.reviews++; }

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

watch(experience, e => updateMeta(e), { immediate: true });

function handleBook(exp) {
  if (exp) { bookingStore.addBooking({ ...exp, guests: guests.value, date: selectedDate.value }); router.push("/cart"); }
}

function openLightbox(i) { lightboxIndex.value = i; lightboxOpen.value = true; }

const hasIncludedItems = (exp) => exp?.included?.length || exp?.highlights?.length || exp?.description || exp?.meetingPoint;
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <Container>
      <div v-if="loading" class="pt-16 pb-12">
        <SkeletonBlock class="h-3 w-32 mb-4" />
        <SkeletonBlock class="h-[400px] w-full rounded-xl mb-4" />
        <SkeletonBlock class="h-7 w-[55%] mb-2" />
        <SkeletonBlock class="h-4 w-48" />
      </div>

      <div v-else-if="experience" class="pb-16">
        <!-- BREADCRUMB -->
        <div class="pt-5 pb-8 md:pb-16">
          <ExperienceBreadcrumbs :location="experience.location" />
        </div>

        <!-- OFFICIAL BADGE + TITLE + RATING ROW -->
        <div class="flex items-center gap-1 text-[#59657b] dark:text-gray-400 text-[12px] font-semibold mb-1">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
          <span>{{ localeStore.t("exp.officialTicket") || "Official ticket" }}</span>
        </div>

        <h1 class="text-[24px] md:text-[28px] font-black leading-[1.15] text-[#0b2343] dark:text-white mb-2">{{ experience.title }}</h1>

        <div class="flex flex-wrap items-center gap-3 mb-3">
          <div class="flex items-center gap-1.5">
            <span v-if="experience.badge" class="bg-[#0b2343] text-white text-[10px] font-bold px-2 py-0.5 rounded">{{ experience.badge }}</span>
          </div>
          <div class="flex items-center gap-1 cursor-pointer">
            <Star :size="20" class="text-yellow-500 fill-yellow-500" />
            <span class="text-[15px] font-bold text-[#0b2343] dark:text-white">{{ experience.rating }}</span>
            <span class="text-[14px] text-[#59657b] dark:text-gray-400">({{ experience.reviews ?? 0 }} {{ localeStore.t("exp.reviews") }})</span>
          </div>
          <span class="text-[#c0c7d4]">•</span>
          <span class="text-[13px] text-[#59657b] dark:text-gray-400">{{ localeStore.t("exp.provider") || "Activity provider" }}: {{ experience.location }}</span>
        </div>

        <!-- GALLERY (GYG 4-image quad layout on desktop, single hero on mobile) -->
        <div class="relative w-full md:h-[400px] h-[260px] rounded-xl overflow-hidden mb-5">
          <!-- Mobile: single hero image -->
          <div class="md:hidden w-full h-full cursor-pointer" @click="openLightbox(0)">
            <img loading="lazy" :src="experience.images?.[0] || experience.image" alt="" class="w-full h-full object-cover" />
            <button v-if="(experience.images?.length || 0) > 1" @click="openLightbox(1)" class="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-[11px] font-bold px-3 py-1.5 rounded-lg shadow hover:bg-white transition z-10">
              <Camera :size="13" /> {{ experience.images?.length }} photos
            </button>
          </div>
          <!-- Desktop: quad layout -->
          <div class="hidden md:flex gap-2 h-full">
            <div class="flex-[2] h-full overflow-hidden cursor-pointer rounded-l-xl" @click="openLightbox(0)">
              <img loading="lazy" :src="experience.images?.[0] || experience.image" alt="" class="w-full h-full object-cover hover:opacity-95 transition" />
            </div>
            <div v-if="(experience.images?.length || 0) > 1" class="flex-[2] h-full flex flex-col gap-2">
              <div class="flex flex-1 gap-2">
                <div class="flex-1 overflow-hidden cursor-pointer" :class="(experience.images?.length || 0) < 3 ? 'rounded-tr-xl' : ''" @click="openLightbox(1)">
                  <img loading="lazy" :src="experience.images?.[1]" alt="" class="w-full h-full object-cover hover:opacity-95 transition" />
                </div>
                <div v-if="(experience.images?.length || 0) > 2" class="flex-1 overflow-hidden rounded-tr-xl cursor-pointer" @click="openLightbox(2)">
                  <img loading="lazy" :src="experience.images?.[2]" alt="" class="w-full h-full object-cover hover:opacity-95 transition" />
                </div>
              </div>
              <div v-if="(experience.images?.length || 0) > 3" class="flex flex-1 gap-2">
                <div class="flex-1 overflow-hidden cursor-pointer" @click="openLightbox(3)">
                  <img loading="lazy" :src="experience.images?.[3]" alt="" class="w-full h-full object-cover hover:opacity-95 transition" />
                </div>
                <div class="flex-1 overflow-hidden rounded-br-xl cursor-pointer" @click="openLightbox(4)">
                  <img loading="lazy" :src="experience.images?.[4]" alt="" class="w-full h-full object-cover hover:opacity-95 transition" />
                </div>
              </div>
            </div>
          </div>
          <button v-if="(experience.images?.length || 0) > 4" @click="openLightbox(5)" class="hidden md:flex absolute bottom-3 right-3 items-center gap-1.5 bg-white/90 backdrop-blur-sm text-[11px] font-bold px-3 py-1.5 rounded-lg shadow hover:bg-white transition z-10">
            <Camera :size="13" /> {{ localeStore.t("exp.viewAll") || "View all" }}
          </button>
        </div>

        <!-- TWO-COLUMN: Content + Booking sidebar -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <!-- LEFT: Content (2/3) -->
          <div class="md:col-span-7 lg:col-span-8 space-y-5">
            <!-- KEY DETAILS (Like GYG info cards) -->
            <div class="border border-[#e8ebf0] dark:border-gray-700 rounded-xl p-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="flex items-start gap-3">
                  <div class="w-11 h-11 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0"><ShieldCheck :size="20" class="text-[#0b2343] dark:text-white" /></div>
                  <div><p class="text-[13px] font-bold text-[#0b2343] dark:text-white">{{ localeStore.t("expTrust.freeCancel") || "Free cancellation" }}</p><p class="text-[11px] text-[#59657b] dark:text-gray-400">{{ localeStore.t("expTrust.freeCancelDesc") || "Cancel up to 24 hours in advance" }}</p></div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-11 h-11 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0"><RotateCcw :size="20" class="text-[#0b2343] dark:text-white" /></div>
                  <div><p class="text-[13px] font-bold text-[#0b2343] dark:text-white">{{ localeStore.t("expTrust.reserveNow") || "Reserve now & pay later" }}</p><p class="text-[11px] text-[#59657b] dark:text-gray-400">{{ localeStore.t("expTrust.reserveNowDesc") || "Book your spot, pay later" }}</p></div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-11 h-11 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0"><CalendarDays :size="20" class="text-[#0b2343] dark:text-white" /></div>
                  <div><p class="text-[13px] font-bold text-[#0b2343] dark:text-white">{{ experience.duration || localeStore.t("exp.validDay") || "Valid 1 day" }}</p><p class="text-[11px] text-[#59657b] dark:text-gray-400">{{ localeStore.t("exp.checkAvailability") || "Check availability for times" }}</p></div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-11 h-11 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0"><MapPin :size="20" class="text-[#0b2343] dark:text-white" /></div>
                  <div><p class="text-[13px] font-bold text-[#0b2343] dark:text-white">{{ experience.location }}</p><p class="text-[11px] text-[#59657b] dark:text-gray-400">{{ experience.category }}</p></div>
                </div>
              </div>
            </div>

            <!-- Highlights -->
            <div v-if="experience.highlights?.length" class="border-b border-[#e8ebf0] dark:border-gray-700 pb-5">
              <h2 class="text-[16px] font-black text-[#0b2343] dark:text-white mb-3">{{ localeStore.t("exp.highlights") }}</h2>
              <ul class="space-y-2">
                <li v-for="h in experience.highlights" :key="h" class="flex items-start gap-2 text-[13px] text-[#4f5b72] dark:text-gray-300 leading-snug">
                  <Check :size="15" class="text-green-600 shrink-0 mt-0.5" />
                  <span>{{ h }}</span>
                </li>
              </ul>
            </div>

            <!-- Full description -->
            <div v-if="experience.description" class="border-b border-[#e8ebf0] dark:border-gray-700 pb-5">
              <h2 class="text-[16px] font-black text-[#0b2343] dark:text-white mb-2">{{ localeStore.t("exp.fullDescription") || "Full description" }}</h2>
              <p class="text-[13px] leading-[1.7] text-[#4f5b72] dark:text-gray-300">{{ experience.description }}</p>
            </div>

            <!-- What's included -->
            <div v-if="experience.included?.length" class="border-b border-[#e8ebf0] dark:border-gray-700 pb-5">
              <h2 class="text-[16px] font-black text-[#0b2343] dark:text-white mb-2">{{ localeStore.t("exp.included") }}</h2>
              <ul class="space-y-2">
                <li v-for="item in experience.included" :key="item" class="flex items-start gap-2 text-[13px] text-[#4f5b72] dark:text-gray-300 leading-snug">
                  <Check :size="15" class="text-green-600 shrink-0 mt-0.5" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <!-- Meeting point -->
            <div v-if="experience.meetingPoint" class="border-b border-[#e8ebf0] dark:border-gray-700 pb-5">
              <h2 class="text-[16px] font-black text-[#0b2343] dark:text-white mb-2">{{ localeStore.t("exp.meetingPoint") }}</h2>
              <p class="text-[13px] text-[#4f5b72] dark:text-gray-300">{{ experience.meetingPoint }}</p>
            </div>

            <!-- Customer reviews -->
            <ExperienceReviews
              :listing-id="experience.id"
              :rating="experience.rating"
              :reviews-count="experience.reviews"
              :review-items="reviews"
              @reviewed="handleReviewed"
            />
          </div>

          <!-- RIGHT: Booking sidebar (1/3, sticky) -->
          <div class="md:col-span-5 lg:col-span-4">
            <div class="sticky top-8 border border-[#e8ebf0] dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.08)] overflow-hidden">
              <!-- Price -->
              <div class="p-4 border-b border-[#e8ebf0] dark:border-gray-700">
                <span class="text-[12px] text-[#59657b] dark:text-gray-400">{{ localeStore.t("common.from") || "From" }}</span>
                <span class="text-[22px] font-black text-[#0b2343] dark:text-white ml-1">{{ currencyStore.formatPrice(experience.price) }}</span>
                <span class="text-[12px] text-[#59657b] dark:text-gray-400 ml-1">{{ localeStore.t("exp.perPerson") }}</span>
              </div>

              <div class="p-4 space-y-4">
                <!-- Participants -->
                <div>
                  <label class="block text-[11px] font-bold text-[#0b2343] dark:text-white mb-1.5">{{ localeStore.t("exp.adult") || "Adult" }} x {{ guests }}</label>
                  <div class="flex items-center border border-[#d9dee8] dark:border-gray-600 rounded-lg overflow-hidden">
                    <button @click="guests = Math.max(1, guests - 1)" class="w-10 h-9 flex items-center justify-center text-[#59657b] hover:bg-gray-50 dark:hover:bg-gray-700 transition shrink-0"><Minus :size="14" /></button>
                    <div class="flex-1 h-9 flex items-center justify-center border-x border-[#d9dee8] dark:border-gray-600">
                      <span class="text-[14px] font-bold text-[#0b2343] dark:text-white">{{ guests }}</span>
                    </div>
                    <button @click="guests++" class="w-10 h-9 flex items-center justify-center text-[#59657b] hover:bg-gray-50 dark:hover:bg-gray-700 transition shrink-0"><Plus :size="14" /></button>
                  </div>
                </div>

                <!-- Date -->
                <div>
                  <label class="block text-[11px] font-bold text-[#0b2343] dark:text-white mb-1.5">{{ localeStore.t("exp.selectDate") || "Select date" }}</label>
                  <input type="date" :value="selectedDate" @input="selectedDate = $event.target.value" class="w-full border border-[#d9dee8] dark:border-gray-600 rounded-lg px-3 py-2 text-[13px] font-medium text-[#0b2343] dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0b2343]/10 focus:border-[#0b2343] transition appearance-none" />
                </div>

                <!-- Check availability / Book now -->
                <button @click="handleBook(experience)" class="w-full bg-[#ff5a1f] hover:bg-[#e44a2b] text-white text-[14px] font-bold py-2.5 rounded-lg transition-colors">
                  {{ localeStore.t("exp.bookNow") }}
                </button>

                <!-- Trust badges -->
                <div class="space-y-2 text-[11px] text-[#59657b] dark:text-gray-400">
                  <div class="flex items-start gap-2"><ShieldCheck :size="14" class="text-green-600 shrink-0 mt-0.5" /><span>{{ localeStore.t("expTrust.freeCancelFull") || "Free cancellation. Cancel up to 24 hours in advance for a full refund" }}</span></div>
                  <div class="flex items-start gap-2"><RotateCcw :size="14" class="text-green-600 shrink-0 mt-0.5" /><span>{{ localeStore.t("expTrust.reserveNowFull") || "Reserve now & pay later. Keep your travel plans flexible." }}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RELATED -->
        <div v-if="relatedExperiences.length" class="mt-12">
          <h2 class="text-[17px] font-black text-[#0b2343] dark:text-white mb-4">{{ localeStore.t("exp.youMightAlsoLike") || "You might also like" }}</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ExperienceCard v-for="exp in relatedExperiences" :key="exp.id" :item="exp" />
          </div>
        </div>
      </div>

      <div v-else-if="!loading" class="pt-32 pb-20 text-center">
        <h1 class="text-2xl font-black text-[#0b2343] dark:text-white">{{ localeStore.t("exp.notFound") }}</h1>
        <button @click="router.push('/experiences')" class="mt-3 bg-[#0b2343] text-white font-bold px-4 py-2 rounded-lg hover:bg-[#122d52] transition text-sm">{{ localeStore.t("exp.browseAll") || "Browse all experiences" }}</button>
      </div>
    </Container>

    <!-- Lightbox -->
    <PhotoLightbox :images="experience?.images || [experience?.image]" :initialIndex="lightboxIndex" :open="lightboxOpen" @close="lightboxOpen = false" />
  </div>
</template>
