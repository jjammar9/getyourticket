<script setup>
import { useRouter } from "vue-router";
import { TrendingUp, MapPin, Timer, Ticket, Star, Ship, Landmark, Mountain } from "lucide-vue-next";
import { useLocaleStore } from "../../stores/localeStore.js";

const router = useRouter();
const localeStore = useLocaleStore();

const trending = [
  { label: "Skip the line", key: "trending.skipTheLine", icon: Ticket, color: "#ff5a1f", count: "1,240", unit: "tours" },
  { label: "Colosseum", key: "trending.colosseum", icon: Landmark, color: "#0b2343", count: "622", unit: "activities" },
  { label: "Boat cruise", key: "trending.boatCruise", icon: Ship, color: "#0071eb", count: "890", unit: "tours" },
  { label: "Eiffel Tower", key: "trending.eiffelTower", icon: MapPin, color: "#0b2343", count: "401", unit: "activities" },
  { label: "Free walking tour", key: "trending.freeWalkingTour", icon: Star, color: "#e53935", count: "2,150", unit: "tours" },
  { label: "Day trip", key: "trending.dayTrip", icon: Mountain, color: "#ff5a1f", count: "1,560", unit: "activities" },
  { label: "London Eye", key: "trending.londonEye", icon: MapPin, color: "#0b2343", count: "296", unit: "activities" },
  { label: "Sagrada Familia", key: "trending.sagradaFamilia", icon: Landmark, color: "#0071eb", count: "401", unit: "activities" },
];
</script>

<template>
  <section class="py-8">
    <div class="flex items-center gap-2 mb-5">
      <TrendingUp :size="20" class="text-[#ff5a1f]" />
      <h2 class="text-[17px] font-bold text-[#0b2343] dark:text-white">{{ localeStore.t("trending.title") }}</h2>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div
        v-for="item in trending"
        :key="item.label"
        @click="router.push(`/search?q=${encodeURIComponent(item.label)}`)"
        class="flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-[#d9dee8] dark:border-gray-700 cursor-pointer group hover:border-[#0b2343] dark:hover:border-gray-500 hover:shadow-sm transition-all"
      >
        <div
          class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          :style="{ backgroundColor: item.color + '15' }"
        >
          <component :is="item.icon" :size="18" :color="item.color" />
        </div>

        <div class="min-w-0">
          <p class="text-[14px] font-bold text-[#0b2343] dark:text-white truncate group-hover:text-[#ff5a1f] transition-colors">
            {{ localeStore.t(item.key) }}
          </p>
          <p class="text-[11px] font-medium text-[#8a94a6] dark:text-gray-400">
            {{ item.count }} {{ localeStore.t("trending." + item.unit) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
