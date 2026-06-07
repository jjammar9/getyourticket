<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getSiteContent } from "../../api.js";
import { handleImageError } from "../../constants/placeholder.js";
import { Star } from "lucide-vue-next";
import { useCurrencyStore } from "../../stores/currencyStore.js";
import { useLocaleStore } from "../../stores/localeStore.js";

import SectionTitle from "../ui/SectionTitle.vue";
import Card from "../ui/Card.vue";
import fadeIn from "../../directives/fadeIn.js";

const router = useRouter();
const currencyStore = useCurrencyStore();
const localeStore = useLocaleStore();

const attractionsCards = ref([]);

onMounted(async () => {
  try {
    attractionsCards.value = await getSiteContent("homeAttractions");
  } catch (e) {
    console.error("Failed to load attractions", e);
  }
});

const currentPage = ref(0);
const itemsPerPage = 4;

const visibleCards = computed(() => {
  const start = currentPage.value * itemsPerPage;
  return attractionsCards.value.slice(start, start + itemsPerPage);
});

const nextPage = () => {
  if ((currentPage.value + 1) * itemsPerPage < attractionsCards.value.length) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
};
</script>

<template>
  <section v-fade-in class="py-10">
    <SectionTitle :title="localeStore.t('attractions.title')" viewAllTo="/attractions" />

    <div class="relative">
      <button
        v-if="currentPage > 0"
        @click="prevPage"
        class="absolute left-[-18px] top-[42%] -translate-y-1/2 z-20 w-11 h-11 rounded-full border-2 border-blue-500 bg-white flex items-center justify-center shadow-md hover:shadow-lg transition"
      >
        ←
      </button>

      <transition
        mode="out-in"
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-x-6"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 -translate-x-6"
      >
        <div :key="currentPage" class="grid grid-cols-4 gap-6">
          <Card
            v-for="card in visibleCards"
            :key="card.title"
            @click="router.push(`/destination/${card.title.toLowerCase().replace(/\s+/g, '-')}`)"
            class="cursor-pointer flex flex-col"
          >
            <div class="relative h-[175px] overflow-hidden">
              <img
                :src="card.image"
                :alt="card.title"
                @error="handleImageError"
                class="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"
              />

              <div class="absolute top-0 left-0 bg-[#0b2343] text-white text-[10px] font-extrabold px-3 py-1 rounded-br-[10px] z-10 leading-none">
                {{ card.badge }}
              </div>

              <div class="absolute bottom-0 left-0 w-full h-[10px] bg-[#ff5a1f]"></div>
            </div>

            <div class="px-4 pt-3 pb-2 flex flex-col flex-1">
              <p class="text-[13px] font-semibold text-[#59657b] dark:text-gray-400 leading-tight">
                {{ card.location }} • {{ card.category }}
              </p>

              <h3 class="mt-1 text-[15px] leading-[1.12] font-extrabold text-[#0b2343] dark:text-white line-clamp-3 min-h-[50px]">
                {{ card.title }}
              </h3>

              <p class="mt-1 text-[13px] text-[#4f5b72] dark:text-gray-400 font-medium">
                {{ card.duration }}
                <span v-if="card.extras"> • {{ card.extras }}</span>
              </p>

              <div class="mt-auto pt-2 flex items-end justify-between">
                <div class="flex items-center gap-1">
                  <span class="text-[15px] font-bold text-[#0b2343] dark:text-white">
                    {{ card.rating }}
                  </span>
                  <Star :size="16" fill="currentColor" stroke-width="0" class="text-[#0b2343] dark:text-white" />
                  <span class="text-[13px] text-[#6d788d] dark:text-gray-400 font-medium">
                    ({{ card.reviews }})
                  </span>
                </div>

                <div class="text-right leading-none">
                  <p v-if="card.oldPrice" class="text-[12px] text-[#8a94a6] dark:text-gray-500 line-through font-medium">
                    {{ localeStore.t("common.from") }} {{ currencyStore.formatPrice(card.oldPrice) }}
                  </p>
                  <p class="text-[18px] font-extrabold text-[#e53935] mt-0.5">
                    {{ currencyStore.formatPrice(card.price) }}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </transition>

      <button
        v-if="(currentPage + 1) * itemsPerPage < attractionsCards.length"
        @click="nextPage"
        class="absolute right-[-18px] top-[42%] -translate-y-1/2 z-20 w-11 h-11 rounded-full border-2 border-blue-500 bg-white flex items-center justify-center shadow-md hover:shadow-lg transition"
      >
        →
      </button>
    </div>
  </section>
</template>
