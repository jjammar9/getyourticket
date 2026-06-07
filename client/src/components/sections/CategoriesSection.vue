<script setup>
import { useRouter } from "vue-router";
import { Compass, Landmark, UtensilsCrossed, Mountain, Ship, Theater, Music, ShoppingBag } from "lucide-vue-next";
import { useLocaleStore } from "../../stores/localeStore.js";

const router = useRouter();
const localeStore = useLocaleStore();

const categories = [
  { label: () => localeStore.t("categories.guidedTours"), icon: Compass, slug: "guided-tours" },
  { label: () => localeStore.t("categories.museums"), icon: Landmark, slug: "museums" },
  { label: () => localeStore.t("categories.foodDrink"), icon: UtensilsCrossed, slug: "food-drink" },
  { label: () => localeStore.t("categories.outdoor"), icon: Mountain, slug: "outdoor" },
  { label: () => localeStore.t("categories.boatTours"), icon: Ship, slug: "boat-tours" },
  { label: () => localeStore.t("categories.theatreShows"), icon: Theater, slug: "theatre-shows" },
  { label: () => localeStore.t("categories.concerts"), icon: Music, slug: "concerts" },
  { label: () => localeStore.t("categories.shopping"), icon: ShoppingBag, slug: "shopping" },
];
</script>

<template>
  <section class="py-10">
    <div class="grid grid-cols-4 md:grid-cols-8 gap-4">
      <div
        v-for="cat in categories"
        :key="cat.slug"
        @click="router.push(`/category/${cat.slug}`)"
        class="flex flex-col items-center gap-2 cursor-pointer group"
      >
        <div class="w-16 h-16 rounded-full bg-[#f2f5f9] flex items-center justify-center group-hover:bg-[#e8edf5] transition-colors">
          <component :is="cat.icon" :size="24" class="text-[#0b2343]" />
        </div>
        <span class="text-[12px] font-semibold text-[#4f5b72] text-center leading-tight group-hover:text-[#0b2343] transition-colors">
          {{ cat.label() }}
        </span>
      </div>
    </div>
  </section>
</template>
