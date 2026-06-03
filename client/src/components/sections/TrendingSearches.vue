<script setup>
import { useRouter } from "vue-router";
import { TrendingUp, MapPin, Timer, Ticket, Star, Ship, Landmark, Mountain } from "lucide-vue-next";

const router = useRouter();

const trending = [
  { label: "Skip the line", icon: Ticket, color: "#ff5a1f", count: "1,240 tours" },
  { label: "Colosseum", icon: Landmark, color: "#0b2343", count: "622 activities" },
  { label: "Boat cruise", icon: Ship, color: "#0071eb", count: "890 tours" },
  { label: "Eiffel Tower", icon: MapPin, color: "#0b2343", count: "401 activities" },
  { label: "Free walking tour", icon: Star, color: "#e53935", count: "2,150 tours" },
  { label: "Day trip", icon: Mountain, color: "#ff5a1f", count: "1,560 activities" },
  { label: "London Eye", icon: MapPin, color: "#0b2343", count: "296 activities" },
  { label: "Sagrada Familia", icon: Landmark, color: "#0071eb", count: "401 activities" },
];
</script>

<template>
  <section class="py-8">
    <div class="flex items-center gap-2 mb-5">
      <TrendingUp :size="20" class="text-[#ff5a1f]" />
      <h2 class="text-[17px] font-bold text-[#0b2343]">Popular right now</h2>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div
        v-for="item in trending"
        :key="item.label"
        @click="router.push(`/search?q=${encodeURIComponent(item.label)}`)"
        class="flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-[#d9dee8] cursor-pointer group hover:border-[#0b2343] hover:shadow-sm transition-all"
      >
        <div
          class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          :style="{ backgroundColor: item.color + '15' }"
        >
          <component :is="item.icon" :size="18" :color="item.color" />
        </div>

        <div class="min-w-0">
          <p class="text-[14px] font-bold text-[#0b2343] truncate group-hover:text-[#ff5a1f] transition-colors">
            {{ item.label }}
          </p>
          <p class="text-[11px] font-medium text-[#8a94a6]">
            {{ item.count }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
