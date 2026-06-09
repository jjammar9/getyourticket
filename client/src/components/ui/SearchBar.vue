<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Input from "./Input.vue";
import Button from "./Button.vue";
import { useSearchSuggestions } from "../../composables/useSearchSuggestions.js";
import { useLocaleStore } from "../../stores/localeStore.js";

const router = useRouter();
const localeStore = useLocaleStore();

const typeLabels = {
  location: () => localeStore.t("search.type.location"),
  activity: () => localeStore.t("search.type.activity"),
  category: () => localeStore.t("search.type.category"),
  country: () => localeStore.t("search.type.country"),
};
const search = ref("");
const showSuggestions = ref(false);
const { suggestions } = useSearchSuggestions(search);

const selectSuggestion = (text) => {
  search.value = text;
  showSuggestions.value = false;
  router.push({ path: "/search", query: { q: text } });
};

const onBlur = () => {
  setTimeout(() => {
    showSuggestions.value = false;
  }, 200);
};

const handleSearch = () => {
  const query = search.value.trim();
  showSuggestions.value = false;
  if (!query) return;
  router.push({ path: "/search", query: { q: query } });
};
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-full shadow-2xl p-1.5 w-full relative">
    <div class="flex items-center gap-0">
      <div class="pl-5 pr-2 text-gray-400 shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <Input v-model="search" :placeholder="localeStore.t('searchbar.placeholder')" @focus="showSuggestions = true" @blur="onBlur" @input="showSuggestions = true" @keyup.enter="handleSearch" />
      <div class="pr-1.5">
        <Button @click="handleSearch" class="px-8 py-3.5 text-[17px]"> {{ localeStore.t("searchbar.search") }} </Button>
      </div>
    </div>

    <!-- Autocomplete dropdown -->
    <div
      v-if="showSuggestions && suggestions.length > 0"
      class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
    >
      <div
        v-for="s in suggestions"
        :key="s.text"
        @mousedown.prevent="selectSuggestion(s.text)"
        class="px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 shrink-0">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <div>
          <span class="text-[14px] text-gray-700 dark:text-gray-200">{{ s.text }}</span>
          <span class="text-[11px] text-gray-400 ml-2">&mdash; {{ (typeLabels[s.type] || (() => s.type))() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
