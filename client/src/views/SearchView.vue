<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Container from "../components/ui/Container.vue";
import Breadcrumbs from "../components/ui/Breadcrumbs.vue";
import SearchCard from "../components/cards/SearchCard.vue";
import { experiencesData } from "../data/experiencesData.js";
import { navData } from "../data/megaMenuData.js";
import { toSlug } from "../utils/helpers.js";
import { useSearchSuggestions } from "../composables/useSearchSuggestions.js";
import { useLocaleStore } from "../stores/localeStore.js";

const route = useRoute();
const localeStore = useLocaleStore();
const router = useRouter();

const searchInput = ref("");
const showSuggestions = ref(false);
const { suggestions: autoSuggestions } = useSearchSuggestions(searchInput);

const query = computed(() => (route.query.q || "").toLowerCase().trim());

const results = computed(() => {
  const q = query.value;
  if (!q) return [];

  return experiencesData.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
  );
});

const suggestions = computed(() => {
  const q = query.value;
  if (!q || results.value.length) return [];

  const matches = [];
  const seen = new Set();

  for (const section of Object.values(navData)) {
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
          <h1 class="text-[32px] font-bold tracking-[-0.5px] text-[#0b2343] mb-2">
            {{ localeStore.t("searchView.results") }}
          </h1>
        <p class="text-[16px] font-medium text-gray-500 mb-8">
          {{ localeStore.t("searchView.count", { n: results.length, s: results.length !== 1 ? 's' : '', q: query }) }}
        </p>

        <div v-if="results.length" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <SearchCard v-for="item in results" :key="item.id" :item="item" />
        </div>

        <div v-else-if="suggestions.length" class="py-12">
          <h2 class="text-2xl font-bold text-[#0b2343] mb-2">{{ localeStore.t("searchView.noTours") }}</h2>
          <p class="text-gray-500 mb-6">{{ localeStore.t("searchView.tryBrowsing") }}</p>
          <div class="flex flex-wrap gap-3">
            <button
              v-for="s in suggestions"
              :key="s.title"
              @click="router.push(`/destination/${toSlug(s.title)}`)"
              class="bg-gray-100 hover:bg-gray-200 text-[#0b2343] font-medium px-5 py-2.5 rounded-full transition"
            >
              {{ s.title }}
            </button>
          </div>
        </div>

        <div v-else class="py-20 text-center">
          <h2 class="text-3xl font-bold text-[#0b2343]">{{ localeStore.t("searchView.noResults") }}</h2>
          <p class="mt-2 text-gray-500">{{ localeStore.t("searchView.tryDifferent") }}</p>
          <button
            @click="router.push('/attractions')"
            class="mt-6 bg-[#0a6cff] hover:bg-[#0057d8] text-white font-semibold px-8 py-3 rounded-full transition"
          >
            {{ localeStore.t("searchView.browse") }}
          </button>
        </div>
      </div>

      <div v-else class="py-20 text-center">
        <h2 class="text-3xl font-bold text-[#0b2343]">{{ localeStore.t("searchView.searchExperiences") }}</h2>
        <p class="mt-2 text-gray-500">{{ localeStore.t("searchView.typeAbove") }}</p>
          <div class="mt-8 max-w-md mx-auto relative">
            <div class="flex items-center bg-white rounded-full border border-gray-300 p-1">
              <input
                v-model="searchInput"
                @keyup.enter="searchInput && router.push(`/search?q=${encodeURIComponent(searchInput)}`)"
                @focus="showSuggestions = true"
                @blur="setTimeout(() => showSuggestions = false, 200)"
                @input="showSuggestions = true"
                type="text"
                :placeholder="localeStore.t('searchView.searchDestinations')"
                class="flex-1 px-5 py-2.5 outline-none rounded-full text-[14px] text-gray-700 placeholder:text-gray-400"
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
              class="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50"
            >
              <div
              v-for="s in autoSuggestions"
                :key="s.text"
                @mousedown.prevent="searchInput = s.text; showSuggestions = false; router.push(`/search?q=${encodeURIComponent(s.text)}`)"
                class="px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 shrink-0">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <div>
                  <span class="text-[13px] text-gray-700">{{ s.text }}</span>
                  <span class="text-[11px] text-gray-400 ml-2">— {{ s.type }}</span>
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
            class="bg-white border-2 border-[#0a6cff] text-[#0a6cff] hover:bg-blue-50 font-semibold px-8 py-3 rounded-full transition"
          >
            {{ localeStore.t("searchView.thingsToDo") }}
          </button>
        </div>
      </div>
    </div>
  </Container>
</template>
