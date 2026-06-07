<script setup>
import { computed, ref, onMounted } from "vue";
import ExperienceCard from "../cards/ExperienceCard.vue";
import SectionTitle from "../ui/SectionTitle.vue";
import { getListings } from "../../api.js";
import fadeIn from "../../directives/fadeIn.js";
import { useLocaleStore } from "../../stores/localeStore.js";

const localeStore = useLocaleStore();

const experiencesData = ref([]);

onMounted(async () => {
  try {
    experiencesData.value = await getListings();
  } catch (e) {
    console.error("Failed to load experiences", e);
  }
});

const uniqueImageExperiences = computed(() => {
  const seen = new Set();
  return experiencesData.value.filter((item) => {
    if (seen.has(item.image)) return false;
    seen.add(item.image);
    return true;
  });
});
</script>

<template>
  <section v-fade-in class="py-10">
    <SectionTitle :title="localeStore.t('experiences.title')" viewAllTo="/experiences" />

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
      <ExperienceCard
        v-for="item in uniqueImageExperiences.slice(0, 12)"
        :key="item.id"
        :item="item"
      />
    </div>
  </section>
</template>
