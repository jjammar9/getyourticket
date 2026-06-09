<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getListings, getSiteContent } from "../api.js";
import { toSlug } from "../utils/helpers.js";
import Container from "../components/ui/Container.vue";
import { useLocaleStore } from "../stores/localeStore.js";
import { Search } from "lucide-vue-next";

const router = useRouter();
const localeStore = useLocaleStore();

const searchInput = ref("");
const suggestions = ref([]);

onMounted(async () => {
  try {
    const [listings, megaMenu] = await Promise.all([
      getListings(),
      getSiteContent("megaMenu")
    ]);
    const seen = new Set();
    for (const section of Object.values(megaMenu)) {
      for (const items of Object.values(section.categories)) {
        for (const item of items) {
          if (!seen.has(item.title)) {
            seen.add(item.title);
            suggestions.value.push(item);
          }
        }
      }
    }
  } catch (e) {
    console.error("Failed to load 404 suggestions", e);
  }
});
</script>

<template>
  <Container>
    <div class="py-20 text-center">
      <h1 class="text-7xl md:text-9xl font-black text-[#0b2343]">404</h1>
      <p class="mt-4 text-gray-500 text-lg">{{ localeStore.t("notFound.title") || "Page not found" }}</p>
      <p class="mt-2 text-gray-400 text-sm max-w-md mx-auto">
        {{ localeStore.t("notFound.description") || "The page you are looking for does not exist or has been moved." }}
      </p>

      <div class="mt-10 max-w-md mx-auto">
        <div class="flex items-center bg-white rounded-full border border-gray-300 p-1">
          <input
            v-model="searchInput"
            @keyup.enter="searchInput && router.push(`/search?q=${encodeURIComponent(searchInput)}`)"
            type="text"
            :placeholder="localeStore.t('notFound.searchPlaceholder') || 'Search destinations...'"
            class="flex-1 px-5 py-2.5 outline-none rounded-full text-[14px] text-gray-700 placeholder:text-gray-400"
          />
          <button
            @click="searchInput && router.push(`/search?q=${encodeURIComponent(searchInput)}`)"
            class="bg-[#0a6cff] hover:bg-[#0057d8] text-white text-[14px] font-semibold px-7 py-2.5 rounded-full transition flex items-center gap-2"
          >
            <Search :size="16" />
            {{ localeStore.t("notFound.search") || "Search" }}
          </button>
        </div>
      </div>

      <div v-if="suggestions.length" class="mt-10">
        <p class="text-sm text-gray-400 mb-4">{{ localeStore.t("notFound.popular") || "Popular destinations" }}</p>
        <div class="flex flex-wrap justify-center gap-3">
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

      <button
        @click="router.push('/')"
        class="mt-10 bg-[#0a6cff] hover:bg-[#0057d8] text-white font-semibold px-8 py-3 rounded-full transition"
      >
        {{ localeStore.t("notFound.backHome") || "Back to Home" }}
      </button>
    </div>
  </Container>
</template>
