<script setup>
import { computed, watch, ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNavSearch } from "../composables/useNavSearch.js";
import { getCountryBySlug, getListings, getReviews } from "../api.js";
import CountryCard from "../components/cards/CountryCard.vue";
import NewsletterSection from "../components/sections/NewsletterSection.vue";
import SkeletonCard from "../components/ui/SkeletonCard.vue";
import SkeletonBlock from "../components/ui/SkeletonBlock.vue";
import { handleImageError } from "../constants/placeholder.js";
import FilterModal from "../components/ui/FilterModal.vue";
import DatePickerModal from "../components/ui/DatePickerModal.vue";
import { SlidersHorizontal, ChevronLeft, ChevronRight, Calendar, UtensilsCrossed, Camera, Trophy, Bus, TreePine, Landmark, Music, Wine, Snowflake, Bike, Mountain, Compass, Info } from "lucide-vue-next";
import { h } from "vue";
import { useLocaleStore } from "../stores/localeStore.js";

const localeStore = useLocaleStore();

const HorseIcon = {
  render() {
    return h("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, [
      h("path", { d: "M4 16c0-3 1-5 3-7l2-3 2-2 2 2 3 3c1 1 2 3 2 5" }),
      h("path", { d: "M2 20h20" }),
      h("path", { d: "M8 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2" }),
    ]);
  },
};

const PenguinIcon = {
  render() {
    return h("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, [
      h("ellipse", { cx: "12", cy: "18", rx: "6", ry: "4" }),
      h("path", { d: "M12 6v8" }),
      h("path", { d: "M9 10c0-2 1-3 3-3s3 1 3 3" }),
      h("circle", { cx: "12", cy: "5", r: "1", fill: "currentColor" }),
      h("path", { d: "M8 14c0 2 4 3 4 3s4-1 4-3" }),
    ]);
  },
};

const route = useRoute();
const router = useRouter();
const { setSearchQuery } = useNavSearch();
const slug = computed(() => route.params.slug);

const loading = ref(true);
const error = ref("");
const country = ref(null);
const experiencesList = ref([]);
const countryReviews = ref([]);

async function loadCountryData(slug) {
  loading.value = true;
  error.value = "";
  if (!slug) {
    country.value = null;
    experiencesList.value = [];
    countryReviews.value = [];
    loading.value = false;
    return;
  }
  try {
    const [c, listings] = await Promise.all([
      getCountryBySlug(slug),
      getListings()
    ]);
    country.value = c;
    experiencesList.value = listings || [];
  } catch (e) {
    console.error("Failed to load country data", e);
    error.value = e.message || "Failed to load country data";
  } finally {
    loading.value = false;
  }
}

onMounted(() => loadCountryData(slug.value));
watch(slug, (newSlug) => loadCountryData(newSlug));

const countryName = computed(() => country.value?.name || slug.value.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()));

watch(countryName, (name) => { document.title = `${name} - GetYourTicket`; }, { immediate: true });

const tags = [
  { label: "Dates", icon: Calendar },
  { label: "Food and Drink", icon: UtensilsCrossed },
  { label: "Gaucho", icon: Compass },
  { label: "Wildlife photography", icon: Camera },
  { label: "Sport venues", icon: Trophy },
  { label: "Bus Tours", icon: Bus },
  { label: "National parks", icon: TreePine },
  { label: "Culture & history", icon: Landmark },
  { label: "Tango", icon: Music },
  { label: "Wine", icon: Wine },
  { label: "Winter Sports", icon: Snowflake },
  { label: "Horse riding", icon: HorseIcon },
  { label: "Bike tours", icon: Bike },
  { label: "Penguins", icon: PenguinIcon },
  { label: "Folk music", icon: Music },
  { label: "Glaciers", icon: Mountain },
];

const experiences = computed(() => {
  const c = country.value;
  if (!c) return [];
  return experiencesList.value.filter(
    (exp) => c.cities.some((city) => exp.location.toLowerCase() === city.toLowerCase())
  );
});

const CARD_LIMIT = 8;
const showAll = ref(false);
const activeTag = ref(null);

const tagFilters = {
  "Food and Drink": { keywords: ["food", "drink", "culinary", "cooking", "taste", "gastronomic", "dining", "meal", "cuisine", "restaurant", "foodie", "brewery", "distillery", "market", "street food", "wine", "beer", "tasting", "cocktail", "beverage", "brunch", "dinner", "lunch", "breakfast"], categories: ["Food & drink"] },
  "Gaucho": { keywords: ["gaucho", "cowboy", "ranch", "estancia", "pampa", "farm", "cattle", "rural", "countryside", "farmstead"], categories: [] },
  "Wildlife photography": { keywords: ["wildlife", "photography", "photo", "animal", "bird", "safari", "nature photography", "camera", "photograph", "shoot", "flora", "fauna", "bear", "eagle", "whale", "dolphin", "turtle", "monkey", "exotic"], categories: [] },
  "Sport venues": { keywords: ["sport", "stadium", "arena", "soccer", "football", "baseball", "olympic", "match", "game", "tournament", "race", "motorsport", "nascar", "f1", "grand prix", "tennis", "golf", "ski resort", "sports complex"], categories: [] },
  "Bus Tours": { keywords: ["bus", "coach", "panoramic", "city tour", "hop-on", "hop off", "double decker", "sightseeing bus", "tour bus", "minibus"], categories: [] },
  "National parks": { keywords: ["national park", "nature", "hiking", "trail", "wilderness", "canyon", "forest", "natural", "park", "outdoor", "scenic", "landscape", "waterfall", "lake", "mountain", "trek", "reserve", "sanctuary", "ecology"], categories: ["Adventure"] },
  "Culture & history": { keywords: ["culture", "history", "historical", "museum", "heritage", "art", "architecture", "cultural", "gallery", "exhibition", "monument", "castle", "palace", "fort", "temple", "church", "cathedral", "mosque", "shrine", "ancient", "medieval", "renaissance", "tradition", "custom"], categories: ["Guided tour"] },
  "Tango": { keywords: ["tango", "dance", "milonga", "ballroom", "salsa", "dancing", "choreography"], categories: [] },
  "Wine": { keywords: ["wine", "vineyard", "winery", "wine tasting", "vino", "vintner", "grape", "champagne", "bordeaux", "merlot", "cabernet", "chardonnay", "sauvignon", "pinot", "sommelier"], categories: ["Food & drink"] },
  "Winter Sports": { keywords: ["ski", "snowboard", "winter", "snow", "ice", "sled", "snowmobile", "snowshoe", "apres ski", "skiing", "snow tubing", "ice skate", "ice skating", "frost", "alpine", "slope"], categories: [] },
  "Horse riding": { keywords: ["horse", "riding", "equestrian", "pony", "trail ride", "horseback", "saddle", "stable", "horseman", "cavalry", "carriage", "wagon"], categories: [] },
  "Bike tours": { keywords: ["bike", "bicycle", "cycling", "mountain bike", "ebike", "biking", "cycle", "pedal", "bicycle tour", "bike trail", "cycling path"], categories: [] },
  "Penguins": { keywords: ["penguin", "antarctic", "sub antarctic"], categories: [] },
  "Folk music": { keywords: ["folk", "music", "concert", "live music", "performance", "show", "band", "orchestra", "symphony", "opera", "festival", "musical", "melody", "song", "singer", "guitar", "piano", "violin"], categories: [] },
  "Glaciers": { keywords: ["glacier", "glacial", "icefield", "ice cap", "iceberg", "frozen", "perito moreno"], categories: [] },
};

function matchesTag(exp, tagLabel) {
  const filter = tagFilters[tagLabel];
  if (!filter) return true;
  const text = [exp.title, exp.description, exp.category, exp.badge, exp.extras, ...(exp.highlights || [])].filter(Boolean).join(" ").toLowerCase();
  if (filter.categories.some((c) => c.toLowerCase() === (exp.category || "").toLowerCase())) return true;
  return filter.keywords.some((kw) => text.includes(kw.toLowerCase()));
}

const filteredExperiences = computed(() => {
  if (!activeTag.value) return experiences.value;
  return experiences.value.filter((exp) => matchesTag(exp, activeTag.value));
});

const visibleExperiences = computed(() => {
  const source = filteredExperiences.value;
  if (showAll.value) return source;
  return source.slice(0, CARD_LIMIT);
});

const guides = computed(() => country.value?.guides || []);
const attractions = computed(() => country.value?.attractions || []);

const recommended = computed(() => experiences.value.slice(0, 4));

watch(recommended, async (recs) => {
  if (!recs.length) {
    countryReviews.value = [];
    return;
  }
  try {
    const reviewsArrays = await Promise.all(
      recs.map(exp => getReviews(exp.id))
    );
    const all = [];
    for (let i = 0; i < recs.length; i++) {
      const exp = recs[i];
      const expReviews = reviewsArrays[i] || [];
      for (const r of expReviews) {
        all.push({ ...r, experienceTitle: exp.title, experienceImage: exp.image, experienceId: exp.id });
      }
    }
    countryReviews.value = all;
  } catch (e) {
    console.error("Failed to load reviews", e);
  }
}, { immediate: true });

const expandedReviews = ref(new Set());

function toggleReview(idx) {
  const s = expandedReviews.value;
  if (s.has(idx)) s.delete(idx); else s.add(idx);
  expandedReviews.value = new Set(s);
}

const overallRating = computed(() => {
  if (countryReviews.value.length === 0) return 0;
  const sum = countryReviews.value.reduce((acc, r) => acc + r.rating, 0);
  return (sum / countryReviews.value.length).toFixed(1);
});

const citiesList = computed(() => {
  const seen = new Set();
  const result = [];
  for (const exp of experiences.value) {
    const city = exp.location;
    if (!seen.has(city)) {
      seen.add(city);
      result.push({ name: city, image: exp.image });
    }
  }
  return result;
});

const scrollContainer = ref(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(true);

function updateScrollState() {
  const el = scrollContainer.value;
  if (!el) return;
  canScrollLeft.value = el.scrollLeft > 4;
  canScrollRight.value = el.scrollLeft < el.scrollWidth - el.clientWidth - 4;
}

function scrollLeft() {
  scrollContainer.value?.scrollBy({ left: -200, behavior: "smooth" });
}

function scrollRight() {
  scrollContainer.value?.scrollBy({ left: 200, behavior: "smooth" });
}

let resizeObserver = null;

onMounted(() => {
  updateScrollState();
  const el = scrollContainer.value;
  if (el) {
    el.addEventListener("scroll", updateScrollState);
    resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(el);
  }
});

onUnmounted(() => {
  const el = scrollContainer.value;
  if (el) el.removeEventListener("scroll", updateScrollState);
  if (resizeObserver) resizeObserver.disconnect();
});

const showFilterModal = ref(false);
const showDatePicker = ref(false);
const placeNames = computed(() => citiesList.value.map(c => c.name));

function onApplyFilters(filters) {
  console.log("Filter applied:", filters);
}

watch(countryName, (val) => {
  if (val) setSearchQuery(val);
}, { immediate: true });
</script>

<template>
  <main>
    <div class="bg-white dark:bg-gray-900">
      <div class="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 pt-32 pb-4">
        <div class="flex items-center gap-2">
          <button
            v-if="canScrollLeft"
            @click="scrollLeft"
            class="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft class="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>

          <div
            ref="scrollContainer"
            class="flex items-center gap-3 overflow-x-auto scrollbar-hide flex-1"
            style="scrollbar-width: none; -ms-overflow-style: none;"
          >
            <button
              @click="showFilterModal = true"
              class="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-[#0b2343] dark:text-gray-100 font-medium rounded-full px-5 py-3 text-[15px] whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shrink-0 cursor-pointer"
            >
              <SlidersHorizontal class="w-4 h-4" />
              {{ localeStore.t("country.filters") }}
            </button>
            <button
              v-for="tag in tags"
              :key="tag.label"
              class="font-medium rounded-full px-5 py-3 text-[15px] whitespace-nowrap transition-colors shrink-0 flex items-center gap-2 cursor-pointer"
              :class="tag.label !== 'Dates' && activeTag === tag.label ? 'bg-[#0b2343] dark:bg-gray-800 text-white' : 'bg-gray-100 dark:bg-gray-800 text-[#0b2343] dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'"
              @click="tag.label === 'Dates' ? (showDatePicker = true) : (activeTag = activeTag === tag.label ? null : tag.label)"
            >
              <component :is="tag.icon" class="w-4 h-4 shrink-0" />
              {{ tag.label }}
            </button>
          </div>

          <button
            v-if="canScrollRight"
            @click="scrollRight"
            class="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronRight class="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <p class="text-gray-400 dark:text-gray-400 text-[13px] font-medium mt-4 flex items-center gap-1.5">
          {{ localeStore.t("country.results", { n: filteredExperiences.length, name: countryName }) }}
          <span v-if="activeTag" class="inline-flex items-center gap-1 ml-1 bg-[#0b2343] dark:bg-gray-800 text-white text-[11px] px-2.5 py-0.5 rounded-full font-semibold">
            {{ activeTag }}
            <button @click="activeTag = null" class="cursor-pointer hover:text-gray-300 leading-none">&times;</button>
          </span>
          <Info class="w-4 h-4 text-gray-400 dark:text-gray-500" />
        </p>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-900">
      <div class="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 pb-4">
        <SkeletonCard v-if="loading" count="8" />
        <div v-if="error" class="flex justify-center items-center py-12">
          <p class="text-red-500 text-[15px] font-medium">{{ error }}</p>
        </div>
        <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <CountryCard v-for="exp in visibleExperiences" :key="exp.id" :item="exp" />
        </div>
        <div v-if="filteredExperiences.length > CARD_LIMIT" class="flex justify-center mt-8">
          <button
            @click="showAll = !showAll"
            class="bg-[#0a6cff] text-white font-semibold text-[15px] px-8 py-3 rounded-full hover:bg-[#0057d8] transition-colors"
          >
            {{ showAll ? localeStore.t("country.showLess") : localeStore.t("country.showMore", { n: filteredExperiences.length - CARD_LIMIT }) }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="citiesList.length > 0" class="bg-white dark:bg-gray-900">
      <div class="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-6">
        <h2 class="text-[22px] font-bold text-[#0b2343] dark:text-white mb-6">{{ localeStore.t("country.cities", { name: countryName }) }}</h2>
        <div class="flex gap-5 overflow-x-auto scrollbar-hide pb-2" style="scrollbar-width: none; -ms-overflow-style: none;">
          <div
            v-for="city in citiesList"
            :key="city.name"
            class="shrink-0 w-[220px] group cursor-pointer"
            @click="router.push('/country/' + slug + '?city=' + encodeURIComponent(city.name))"
          >
            <div class="rounded-[14px] overflow-hidden h-[160px]">
              <img
                loading="lazy"
                :src="city.image"
                :alt="city.name"
                class="w-full h-full object-cover group-hover:scale-[1.05] transition duration-500"
                @error="handleImageError"
              />
            </div>
            <p class="mt-2 text-[15px] font-bold text-[#0b2343] dark:text-white text-center">{{ city.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <NewsletterSection />

    <div v-if="guides.length > 0" class="bg-white dark:bg-gray-900">
      <div class="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-[22px] font-bold text-[#0b2343] dark:text-white">{{ localeStore.t("country.guides", { name: countryName }) }}</h2>
          <a
            :href="'https://www.getyourguide.com/explorer/' + slug + '-ttd-l168990/'"
            target="_blank"
            class="text-[#0a6cff] dark:text-blue-400 font-semibold text-[15px] hover:underline"
          >{{ localeStore.t("country.exploreAll") }}</a>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <a
            :href="guides[0].url"
            target="_blank"
            class="lg:col-span-2 group"
          >
            <div class="rounded-[14px] overflow-hidden h-[300px] mb-4">
              <img
                loading="lazy"
                :src="guides[0].image"
                :alt="guides[0].title"
                class="w-full h-full object-cover group-hover:scale-[1.05] transition duration-500"
                @error="handleImageError"
              />
            </div>
            <h3 class="text-[18px] font-bold text-[#0b2343] dark:text-white group-hover:text-[#0a6cff] transition-colors leading-snug">{{ guides[0].title }}</h3>
            <p class="text-gray-500 dark:text-gray-400 text-[14px] mt-1.5 leading-relaxed">{{ guides[0].text }}</p>
            <p class="text-gray-400 dark:text-gray-500 text-[13px] mt-2">{{ guides[0].date }}</p>
          </a>

          <div class="flex flex-col gap-6">
            <a
              v-for="(guide, idx) in guides.slice(1)"
              :key="idx"
              :href="guide.url"
              target="_blank"
              class="group flex gap-4"
            >
              <div class="shrink-0 w-[100px] h-[100px] rounded-[10px] overflow-hidden">
                <img
                  loading="lazy"
                  :src="guide.image"
                  :alt="guide.title"
                  class="w-full h-full object-cover group-hover:scale-[1.05] transition duration-500"
                  @error="handleImageError"
                />
              </div>
              <div class="min-w-0">
                <h3 class="text-[15px] font-bold text-[#0b2343] dark:text-white group-hover:text-[#0a6cff] transition-colors leading-snug">{{ guide.title }}</h3>
                <p class="text-gray-500 dark:text-gray-400 text-[13px] mt-1 leading-relaxed line-clamp-2">{{ guide.text }}</p>
                <p class="text-gray-400 dark:text-gray-500 text-[12px] mt-1.5">{{ guide.date }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-if="recommended.length > 0" class="bg-white dark:bg-gray-900">
      <div class="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-12">
        <h2 class="text-[22px] font-bold text-[#0b2343] dark:text-white mb-8">{{ localeStore.t("country.recommended", { name: countryName }) }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="exp in recommended"
            :key="exp.id"
            class="flex gap-4 group cursor-pointer"
            @click="router.push('/experience/' + exp.id)"
          >
            <div class="shrink-0 w-[330px] h-[270px] rounded-[14px] overflow-hidden">
              <img
                loading="lazy"
                :src="exp.image"
                :alt="exp.title"
                class="w-full h-full object-cover group-hover:scale-[1.05] transition duration-500"
                @error="handleImageError"
              />
            </div>
            <div class="min-w-0 flex flex-col justify-between">
              <div>
                <h3 class="text-[16px] font-bold text-[#0b2343] dark:text-white group-hover:text-[#0a6cff] transition-colors leading-snug line-clamp-2">{{ exp.title }}</h3>
                <p class="text-gray-500 dark:text-gray-400 text-[13px] mt-1.5 leading-relaxed line-clamp-2">{{ exp.description || localeStore.t("country.fallbackDesc", { title: exp.title, location: exp.location }) }}</p>
              </div>
              <span class="text-[#0a6cff] dark:text-blue-400 font-semibold text-[14px] mt-2">{{ localeStore.t("country.seeMore") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="countryReviews.length > 0" class="bg-white dark:bg-gray-900">
      <div class="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-12">
        <h2 class="text-[22px] font-bold text-[#0b2343] dark:text-white mb-8">{{ localeStore.t("country.reviews", { name: countryName }) }}</h2>

        <p class="text-[15px] text-gray-500 dark:text-gray-400 font-medium mb-3">{{ localeStore.t("country.overall") }}</p>
        <div class="flex flex-col items-start mb-8">
          <span class="text-[28px] font-bold text-[#0b2343] dark:text-white">{{ overallRating }} / 5</span>
          <div class="flex items-center gap-0.5 mt-1">
            <svg v-for="i in 5" :key="i" class="w-5 h-5" :class="i <= Math.round(Number(overallRating)) ? 'text-black dark:text-white' : 'text-gray-200 dark:text-gray-600'" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span class="text-gray-400 dark:text-gray-500 text-[14px] mt-1">{{ localeStore.t("country.based", { n: countryReviews.length }) }}</span>
        </div>

        <div :class="countryReviews.length > 3 ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex gap-6 flex-wrap'">
          <div
            v-for="(review, idx) in countryReviews"
            :key="idx"
            class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-[14px] p-5 shadow-sm shadow-gray-200 dark:shadow-gray-900"
          >
            <div class="mb-3">
              <span
                class="text-[16px] font-extrabold text-[#0b2343] dark:text-white hover:text-[#0a6cff] transition-colors cursor-pointer underline"
                @click="router.push('/experience/' + review.experienceId)"
              >{{ review.experienceTitle }}</span>
            </div>
            <div class="flex items-center gap-0.5 mb-3">
              <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= review.rating ? 'text-black dark:text-white' : 'text-gray-200 dark:text-gray-600'" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div class="flex items-start gap-3 mb-3">
              <div class="shrink-0 w-[44px] h-[44px] rounded-full bg-orange-500 text-white text-[18px] font-bold flex items-center justify-center">
                {{ review.name.charAt(0) }}
              </div>
              <div class="min-w-0">
                <p class="text-[15px] font-bold text-[#0b2343] dark:text-white leading-tight">{{ review.name }}</p>
                <p class="text-gray-400 dark:text-gray-500 text-[12px] mt-0.5">{{ review.date }}</p>
              </div>
            </div>
            <p class="text-[13px] text-black dark:text-gray-200 font-bold leading-relaxed" :class="expandedReviews.has(idx) ? '' : 'line-clamp-2'">{{ review.text }}</p>
            <button v-if="review.text.length > 80" @click="toggleReview(idx)" class="text-[13px] text-black dark:text-gray-200 underline mt-1 cursor-pointer hover:text-gray-700 dark:hover:text-gray-400">{{ expandedReviews.has(idx) ? localeStore.t("country.seeLess") : localeStore.t("country.seeMoreShort") }}</button>
            <div class="mt-3 rounded-[10px] overflow-hidden h-[80px] w-1/2">
              <img
                loading="lazy"
                :src="review.image"
                alt="Tour photo"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="attractions.length > 0" class="bg-white dark:bg-gray-900">
      <div class="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-12">
        <h2 class="text-[22px] font-bold text-[#0b2343] dark:text-white mb-8">{{ localeStore.t("country.attractions", { name: countryName }) }}</h2>
        <div class="flex flex-wrap gap-1.5">
          <a
            v-for="(attraction, idx) in attractions"
            :key="idx"
            href="#"
            class="flex items-stretch group cursor-pointer"
          >
            <span class="w-7 bg-[#0b2343] dark:bg-gray-800 text-white text-[12px] font-bold flex items-center justify-center shrink-0">{{ idx + 1 }}</span>
            <span class="border border-[#0b2343] dark:border-gray-400 text-[#0b2343] dark:text-gray-100 font-medium text-[12px] px-2.5 py-1.5 flex items-center whitespace-nowrap transition-all duration-500 ease-in-out hover:text-white bg-gradient-to-r from-[#0b2343] to-[#0b2343] bg-[length:0%_100%] bg-left-bottom bg-no-repeat hover:bg-[length:100%_100%]">{{ attraction }}</span>
          </a>
        </div>
      </div>
    </div>

    <FilterModal
      :visible="showFilterModal"
      :places="placeNames"
      @close="showFilterModal = false"
      @apply="onApplyFilters"
    />
    <DatePickerModal
      v-if="showDatePicker"
      @close="showDatePicker = false"
      @apply="(d) => { showDatePicker = false; console.log('Date:', d); }"
    />
  </main>
</template>
