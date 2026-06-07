<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Heart, Star } from "lucide-vue-next";
import Card from "../ui/Card.vue";
import { useCurrencyStore } from "../../stores/currencyStore.js";
import { useLocaleStore } from "../../stores/localeStore.js";

const router = useRouter();
const currencyStore = useCurrencyStore();
const localeStore = useLocaleStore();

defineProps({
  item: Object,
});

const imageFailed = ref(false);

const goToExperience = () => {
  router.push(`/experience/${props.item.id}`);
};

const onImageError = (e) => {
  imageFailed.value = true;
};
</script>

<template>
  <Card v-if="!imageFailed" @click="goToExperience" class="cursor-pointer">
    <!-- IMAGE -->
    <div class="relative h-[175px] overflow-hidden">
      <img
        :src="item.image"
        :alt="item.title"
        @error="onImageError"
        class="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"
      />

      <div class="absolute inset-0 bg-gradient-to-b from-[#245fb8]/50 via-[#245fb8]/30 via-40% to-transparent"></div>

      <div class="absolute inset-0 bg-gradient-to-b from-[#163d7a]/30 via-[#163d7a]/12 to-transparent"></div>

      <div class="absolute top-3 left-3 bg-[#0b2343] text-white text-[10px] font-extrabold px-3 py-1 rounded-[10px] z-10 leading-none">
        {{ item.badge }}
      </div>

      <button @click.stop class="absolute top-3 right-3 w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center z-10">
        <Heart :size="18" stroke-width="2.3" class="text-[#0b2343]" />
      </button>

      <div class="absolute bottom-0 left-0 w-full h-[10px] bg-[#ff5a1f]"></div>
    </div>

    <div class="px-4 pt-3 pb-2 flex flex-col flex-1">
      <p class="text-[13px] font-semibold text-[#59657b] dark:text-gray-400 leading-tight">
        {{ item.location }} • {{ item.category }}
      </p>

      <h3 class="mt-1 text-[15px] leading-[1.12] font-extrabold text-[#0b2343] dark:text-white line-clamp-3 min-h-[50px]">
        {{ item.title }}
      </h3>

      <p class="mt-1 text-[13px] text-[#4f5b72] dark:text-gray-400 font-medium">
        {{ item.duration }}
        <span v-if="item.extras"> • {{ item.extras }}</span>
      </p>

      <div class="mt-auto pt-2 flex items-end justify-between">
        <div class="flex items-center gap-1">
          <span class="text-[15px] font-bold text-[#0b2343] dark:text-white">
            {{ item.rating }}
          </span>
          <Star :size="16" fill="currentColor" stroke-width="0" class="text-[#0b2343] dark:text-white" />
          <span class="text-[13px] text-[#6d788d] dark:text-gray-400 font-medium">
            ({{ item.reviews }})
          </span>
        </div>

        <div class="text-right leading-none">
          <p v-if="item.oldPrice" class="text-[12px] text-[#8a94a6] dark:text-gray-500 line-through font-medium">
            {{ localeStore.t("common.from") }} {{ currencyStore.formatPrice(item.oldPrice) }}
          </p>
          <p class="text-[18px] font-extrabold text-[#e53935] mt-0.5">
            {{ currencyStore.formatPrice(item.price) }}
          </p>
        </div>
      </div>
    </div>
  </Card>
</template>
