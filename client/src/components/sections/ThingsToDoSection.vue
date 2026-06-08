<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getSiteContent } from "../../api.js";
import { handleImageError } from "../../constants/placeholder.js";
import SectionTitle from "../ui/SectionTitle.vue";
import fadeIn from "../../directives/fadeIn.js";
import { useLocaleStore } from "../../stores/localeStore.js";

const router = useRouter();
const localeStore = useLocaleStore();

const thingsToDoCards = ref([]);

onMounted(async () => {
  try {
    thingsToDoCards.value = await getSiteContent("homeThingsToDo");
  } catch (e) {
    console.error("Failed to load things to do", e);
  }
});
</script>

<template>
  <section v-fade-in class="py-10">
    <SectionTitle :title="localeStore.t('things.title')" viewAllTo="/things-to-do" />

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
      <div
        v-for="card in thingsToDoCards"
        :key="card.title"
        @click="router.push(`/destination/${card.title.toLowerCase().replace(/\s+/g, '-')}`)"
        class="relative rounded-2xl overflow-hidden cursor-pointer group h-[200px] sm:h-[240px] lg:h-[260px]"
      >
        <img
          loading="lazy"
          :src="card.image"
          :alt="card.title"
          @error="handleImageError"
          class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />

        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        <div class="absolute bottom-0 left-0 right-0 p-4">
          <h3 class="text-white text-[18px] font-bold leading-tight">
            {{ card.title }}
          </h3>
          <p v-if="card.subtitle" class="text-white/80 text-[13px] mt-1 font-medium">
            {{ card.subtitle }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
