<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Container from "../components/ui/Container.vue";
import Breadcrumbs from "../components/ui/Breadcrumbs.vue";
import SearchCard from "../components/cards/SearchCard.vue";
import SkeletonCard from "../components/ui/SkeletonCard.vue";
import { getListingsWithTotal, getSiteContent } from "../api.js";
import { toSlug } from "../utils/helpers.js";
import { useSearchSuggestions } from "../composables/useSearchSuggestions.js";
import { useLocaleStore } from "../stores/localeStore.js";

const route = useRoute();
const localeStore = useLocaleStore();
const router = useRouter();

const searchInput = ref("");
const showSuggestions = ref(false);
const loading = ref(false);
const error = ref("");
const { suggestions: autoSuggestions } = useSearchSuggestions(searchInput);

const searchResults = ref([]);
const totalCount = ref(0);
const navData = ref({});
const sortBy = ref("relevance");
const PER_PAGE = 12;

const query = computed(() => (route.query.q || "").toLowerCase().trim());

const hasMore = computed(() => searchResults.value.length < totalCount.value);

async function fetchResults() {
  const q = query.value;
  if (!q) {
    searchResults.value = [];
    totalCount.value = 0;
    return;
  }
  loading.value = true;
  error.value = "";
  try {
    const params = {
      search: q,
      sort: sortBy.value === "relevance" ? undefined : sortBy.value,
      limit: PER_PAGE,
      offset: searchResults.value.length,
    };
    const data = await getListingsWithTotal(params);
    searchResults.value = [...searchResults.value, ...data.listings];
    totalCount.value = data.total;
  } catch (e) {
    console.error("Search failed", e);
    error.value = "Something went wrong. Please try again later.";
  } finally {
    loading.value = false;
  }
}

function loadMore() {
  fetchResults();
}

watch([query, sortBy], () => {
  searchResults.value = [];
  totalCount.value = 0;
  fetchResults();
});

onMounted(async () => {
  try {
    const megaMenu = await getSiteContent("megaMenu");
    navData.value = megaMenu;
  } catch (e) {
    console.error("Failed to load nav data", e);
  }
  fetchResults();
});

const suggestions = computed(() => {
  const q = query.value;
  if (!q || searchResults.value.length) return [];

  const matches = [];
  const seen = new Set();

  for (const section of Object.values(navData.value)) {
    for (const items of Object.values(section.categories)) {
      for (const item of items) {
        if (item.title.toLowerCase().includes(q) && !seen.has(item.title)) {
          seen.add(item.title);
          matches.push(item);
        }
      }
    }
  }
  return matches.slice(0, 8);
});
</script>

<template>
  <Container>
    <div class="pt-32 pb-12">
      <Breadcrumbs :pages="query ? [{ label: localeStore.t('searchbar.search') }] : []" />

      <div v-if="query">
          <h1 class="text-[32px] font-bold tracking-[-0.5px] text-[#0b2343] dark:text-white mb-2">
            {{ localeStore.t("searchView.results") }}
          </h1>
        <div class="flex items-center justify-between mb-6">
          <p class="text-[16px] font-medium text-gray-500 dark:text-gray-400">
            {{ localeStore.t("searchView.count", { n: totalCount, s: totalCount !== 1 ? 's' : '', q: query }) }}
          </p>
          <select v-model="sortBy" class="border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 outline-none focus:border-[#ff5533] bg-white">
            <option value="relevance">Sort by: Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="title">Alphabetical</option>
          </select>
        </div>

        <SkeletonCard v-if="loading" count="8" />
        <p v-if="error" class="text-red-500 mb-4">{{ error }}</p>

        <div v-if="searchResults.length && !loading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <SearchCard v-for="item in searchResults" :key="item.id" :item="item" />
        </div>

        <div v-if="hasMore" class="flex justify-center mt-10">
          <button @click="loadMore" class="bg-[#0a6cff] hover:bg-[#0057d8] text-white font-semibold px-10 py-3 rounded-full transition">
            Show More ({{ totalCount - searchResults.length }} remaining)
          </button>
        </div>

        <div v-else-if="suggestions.length" class="py-12">
          <h2 class="text-2xl font-bold text-[#0b2343] dark:text-white mb-2">{{ localeStore.t("searchView.noTours") }}</h2>
          <p class="text-gray-500 dark:text-gray-400 mb-6">{{ localeStore.t("searchView.tryBrowsing") }}</p>
          <div class="flex flex-wrap gap-3">
            <button
              v-for="s in suggestions"
              :key="s.title"
              @click="router.push(`/destination/${toSlug(s.title)}`)"
              class="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-[#0b2343] dark:text-gray-100 font-medium px-5 py-2.5 rounded-full transition"
            >
              {{ s.title }}
            </button>
          </div>
        </div>

        <div v-else class="py-20 text-center">
          <h2 class="text-3xl font-bold text-[#0b2343] dark:text-white">{{ localeStore.t("searchView.noResults") }}</h2>
          <p class="mt-2 text-gray-500 dark:text-gray-400">{{ localeStore.t("searchView.tryDifferent") }}</p>
          <button
            @click="router.push('/attractions')"
            class="mt-6 bg-[#0a6cff] hover:bg-[#0057d8] text-white font-semibold px-8 py-3 rounded-full transition"
          >
            {{ localeStore.t("searchView.browse") }}
          </button>
        </div>
      </div>

      <div v-else class="py-20 text-center">
        <h2 class="text-3xl font-bold text-[#0b2343] dark:text-white">{{ localeStore.t("searchView.searchExperiences") }}</h2>
        <p class="mt-2 text-gray-500 dark:text-gray-400">{{ localeStore.t("searchView.typeAbove") }}</p>
          <div class="mt-8 max-w-md mx-auto relative">
            <div class="flex items-center bg-white dark:bg-gray-800 rounded-full border border-gray-300 dark:border-gray-600 p-1">
              <input
                v-model="searchInput"
                @keyup.enter="searchInput && router.push(`/search?q=${encodeURIComponent(searchInput)}`)"
                @focus="showSuggestions = true"
                @blur="setTimeout(() => showSuggestions = false, 200)"
                @input="showSuggestions = true"
                type="text"
                :placeholder="localeStore.t('searchView.searchDestinations')"
                class="flex-1 px-5 py-2.5 outline-none rounded-full text-[14px] text-gray-700 dark:text-gray-200 placeholder:text-gray-400"
              />
              <button
                @click="searchInput && router.push(`/search?q=${encodeURIComponent(searchInput)}`)"
                class="bg-[#0a6cff] hover:bg-[#0057d8] text-white text-[14px] font-semibold px-7 py-2.5 rounded-full transition"
              >
                {{ localeStore.t("searchbar.search") }}
              </button>
            </div>
            <div
              v-if="showSuggestions && autoSuggestions.length > 0"
              class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
            >
              <div
              v-for="s in autoSuggestions"
                :key="s.text"
                @mousedown.prevent="searchInput = s.text; showSuggestions = false; router.push(`/search?q=${encodeURIComponent(s.text)}`)"
                class="px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 dark:text-gray-500 shrink-0">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <div>
                  <span class="text-[13px] text-gray-700 dark:text-gray-200">{{ s.text }}</span>
                  <span class="text-[11px] text-gray-400 dark:text-gray-500 ml-2">— {{ s.type }}</span>
                </div>
              </div>
            </div>
          </div>
        <div class="mt-10 flex flex-wrap justify-center gap-4">
          <button
            @click="router.push('/attractions')"
            class="bg-[#0a6cff] hover:bg-[#0057d8] text-white font-semibold px-8 py-3 rounded-full transition"
          >
            {{ localeStore.t("searchView.browse") }}
          </button>
          <button
            @click="router.push('/things-to-do')"
            class="bg-white dark:bg-gray-800 border-2 border-[#0a6cff] text-[#0a6cff] hover:bg-blue-50 dark:hover:bg-gray-700 font-semibold px-8 py-3 rounded-full transition"
          >
            {{ localeStore.t("searchView.thingsToDo") }}
          </button>
        </div>
      </div>
    </div>
  </Container>
</template>
