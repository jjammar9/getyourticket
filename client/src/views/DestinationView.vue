<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Container from "../components/ui/Container.vue";
import Breadcrumbs from "../components/ui/Breadcrumbs.vue";
import SearchCard from "../components/cards/SearchCard.vue";
import { getListings, getSiteContent } from "../api.js";
import { toSlug } from "../utils/helpers.js";
import { useLocaleStore } from "../stores/localeStore.js";
const localeStore = useLocaleStore();

const route = useRoute();
const router = useRouter();

const experiencesData = ref([]);
const navData = ref({});

onMounted(async () => {
  try {
    const [listings, megaMenu] = await Promise.all([
      getListings(),
      getSiteContent("megaMenu")
    ]);
    experiencesData.value = listings;
    navData.value = megaMenu;
  } catch (e) {
    console.error("Failed to load data", e);
  }
});

const title = computed(() => {
  return (route.params.slug || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
});

const itemInfo = computed(() => {
  const slug = (route.params.slug || "").toLowerCase();

  for (const [sectionKey, section] of Object.entries(navData.value)) {
    for (const [category, items] of Object.entries(section.categories)) {
      for (const item of items) {
        if (toSlug(item.title) === slug) {
          return { sectionKey, section: section.label, category, item };
        }
      }
    }
  }
  return null;
});

const sectionRoute = computed(() => {
  if (!itemInfo.value) return "/";
  const map = { places: "/attractions", things: "/things-to-do", inspiration: "/" };
  return map[itemInfo.value.sectionKey] || "/";
});

const experiences = computed(() => {
  const slug = (route.params.slug || "").toLowerCase();
  const loc = itemInfo.value?.item?.subtitle?.split(",")[0]?.trim() || "";

  return experiencesData.value.filter(
    (exp) => toSlug(exp.location) === slug || (loc && toSlug(exp.location) === toSlug(loc))
  );
});

const breadcrumbs = computed(() => {
  const crumbs = [];
  if (itemInfo.value) {
    crumbs.push({ label: itemInfo.value.section, to: sectionRoute.value });
    crumbs.push({ label: itemInfo.value.category });
  }
  crumbs.push({ label: title.value });
  return crumbs;
});

const randomExperiences = computed(() => {
  const shuffled = [...experiencesData.value].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4);
});
</script>

<template>
  <Container>
    <div class="pt-32 pb-12">
      <Breadcrumbs :pages="breadcrumbs" />

      <div v-if="itemInfo" class="mb-10">
        <div class="relative h-[300px] rounded-2xl overflow-hidden mb-6">
          <img
            :src="itemInfo.item.image"
            :alt="itemInfo.item.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-8">
            <h1 class="text-[36px] font-bold text-white tracking-[-0.5px]">
              {{ itemInfo.item.title }}
            </h1>
            <p class="text-white/80 text-[16px] mt-1 font-medium">
              {{ itemInfo.item.subtitle }}
            </p>
          </div>
        </div>
      </div>

      <h1 v-else class="text-[32px] font-bold tracking-[-0.5px] text-[#0b2343] mb-8">
        {{ title }}
      </h1>

      <div v-if="experiences.length" class="mb-6">
        <h2 class="text-[22px] font-bold text-[#0b2343] mb-6">{{ localeStore.t("dest.tours") }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <SearchCard v-for="item in experiences" :key="item.id" :item="item" />
        </div>
      </div>

      <div v-else class="py-16 text-center border-t border-gray-100">
        <h2 class="text-3xl font-bold text-[#0b2343]">{{ localeStore.t("dest.explore", { name: title }) }}</h2>
        <p class="mt-2 text-gray-500 max-w-md mx-auto">
          {{ localeStore.t("dest.discover") }}
        </p>
        <button
          @click="router.push('/attractions')"
          class="mt-6 inline-block bg-[#0a6cff] hover:bg-[#0057d8] text-white font-semibold px-8 py-3 rounded-full transition"
        >
          {{ localeStore.t("dest.browse") }}
        </button>
      </div>

      <div v-if="!experiences.length" class="mt-16">
        <h2 class="text-[22px] font-bold text-[#0b2343] mb-6">{{ localeStore.t("dest.popular") }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <SearchCard v-for="item in randomExperiences" :key="item.id" :item="item" />
        </div>
      </div>
    </div>
  </Container>
</template>
