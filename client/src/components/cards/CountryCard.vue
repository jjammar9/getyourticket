<script setup>
import { useRouter } from "vue-router";
import { Heart, Star } from "lucide-vue-next";
import { handleImageError } from "../../constants/placeholder.js";
import { useCurrencyStore } from "../../stores/currencyStore.js";
import { useLocaleStore } from "../../stores/localeStore.js";

const router = useRouter();
const currencyStore = useCurrencyStore();
const localeStore = useLocaleStore();

defineProps({
  item: Object,
});

const goToExperience = (id) => {
  router.push(`/experience/${id}`);
};
</script>

<template>
  <div
    @click="goToExperience(item.id)"
    class="bg-white rounded-[18px] border border-[#d9dee8] overflow-hidden cursor-pointer group flex flex-col h-full hover:shadow-md transition-all duration-300"
  >
    <div class="relative h-[175px] overflow-hidden">
      <img
        :src="item.image"
        :alt="item.title"
        @error="handleImageError"
        loading="lazy"
        class="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"
      />
      <button @click.stop class="absolute top-3 right-3 w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center z-10">
        <Heart :size="18" stroke-width="2.3" class="text-[#0b2343]" />
      </button>
    </div>
    <div class="px-4 pt-3 pb-4 flex flex-col flex-1">
      <p class="text-[13px] font-semibold text-[#59657b] leading-tight">
        {{ item.location }} • {{ item.category }}
      </p>
      <h3 class="mt-1 text-[15px] leading-[1.12] font-extrabold text-[#0b2343] line-clamp-3 min-h-[50px]">
        {{ item.title }}
      </h3>
      <p class="mt-1 text-[13px] text-[#4f5b72] font-medium">
        {{ item.duration }}
        <span v-if="item.extras"> • {{ item.extras }}</span>
      </p>
      <div class="mt-auto pt-3 flex items-end justify-between">
        <div class="flex items-center gap-1">
          <span class="text-[15px] font-bold text-[#0b2343]">
            {{ item.rating }}
          </span>
          <Star :size="16" fill="currentColor" stroke-width="0" class="text-[#0b2343]" />
          <span class="text-[13px] text-[#6d788d] font-medium">
            ({{ item.reviews }})
          </span>
        </div>
        <div class="text-right leading-none">
          <p v-if="item.oldPrice" class="text-[12px] text-[#8a94a6] line-through font-medium">
            {{ localeStore.t("common.from") }} {{ currencyStore.formatPrice(item.oldPrice) }}
          </p>
          <p class="text-[18px] font-extrabold text-[#e53935] mt-0.5">
            {{ currencyStore.formatPrice(item.price) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
