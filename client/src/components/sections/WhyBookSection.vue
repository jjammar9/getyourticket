<script setup>
import { ref, onMounted } from "vue";
import { getSiteContent } from "../../api.js";
import WhyBookCard from "../cards/WhyBookCard.vue";
import fadeIn from "../../directives/fadeIn.js";
import { useLocaleStore } from "../../stores/localeStore.js";

const localeStore = useLocaleStore();

const whyBookData = ref([]);

onMounted(async () => {
  try {
    whyBookData.value = await getSiteContent("whyBook");
  } catch (e) {
    console.error("Failed to load why book data", e);
  }
});
</script>

<template>
  <section v-fade-in class="py-16">
    <h2 class="text-[32px] font-bold text-[#0b2343] dark:text-white text-center mb-10">
      {{ localeStore.t("why.title") }}
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[960px] mx-auto">
      <WhyBookCard v-for="item in whyBookData" :key="item.title" :item="item" />
    </div>
  </section>
</template>
