<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Heart, Star, Trash2 } from "lucide-vue-next";
import Container from "../components/ui/Container.vue";
import { useAuthStore } from "../stores/authStore.js";
import { useLocaleStore } from "../stores/localeStore.js";
import { useCurrencyStore } from "../stores/currencyStore.js";
import { handleImageError } from "../constants/placeholder.js";

const router = useRouter();
const authStore = useAuthStore();
const localeStore = useLocaleStore();
const currencyStore = useCurrencyStore();

const wishlistItems = ref([]);
const loading = ref(true);

onMounted(async () => {
  if (!authStore.isLoggedIn) {
    loading.value = false;
    return;
  }
  try {
    const data = await authStore.getWishlist();
    wishlistItems.value = data.wishlist || [];
  } catch (e) {
    console.error("Failed to load wishlist", e);
  } finally {
    loading.value = false;
  }
});

async function removeFromWishlist(listingId) {
  try {
    await authStore.removeFromWishlist(listingId);
    wishlistItems.value = wishlistItems.value.filter((item) => item.listingId !== listingId && item.listing.id !== listingId);
  } catch (e) {
    console.error("Failed to remove from wishlist", e);
  }
}

function goToExperience(id) {
  router.push(`/experience/${id}`);
}
</script>

<template>
  <Container>
    <div class="pt-32 pb-12">
      <h1 class="text-[32px] font-bold tracking-[-0.5px] text-[#0b2343] mb-8">
        {{ localeStore.t("wishlist.title") }}
      </h1>

      <div v-if="!authStore.isLoggedIn" class="text-center py-20">
        <p class="text-[16px] text-gray-500">{{ localeStore.t("wishlist.login") }}</p>
      </div>

      <div v-else-if="loading" class="text-center py-20">
        <p class="text-[16px] text-gray-500">Loading...</p>
      </div>

      <div v-else-if="wishlistItems.length === 0" class="text-center py-20">
        <Heart :size="48" class="mx-auto text-gray-300 mb-4" />
        <p class="text-[16px] text-gray-500">{{ localeStore.t("wishlist.empty") }}</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <div
          v-for="item in wishlistItems"
          :key="item.id || item.listingId"
          class="bg-white rounded-[18px] border border-[#d9dee8] overflow-hidden cursor-pointer group flex flex-col h-full hover:shadow-md transition-all duration-300"
          @click="goToExperience(item.listing.id)"
        >
          <div class="relative h-[175px] overflow-hidden">
            <img
              :src="item.listing.image"
              :alt="item.listing.title"
              @error="handleImageError"
              loading="lazy"
              class="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-[#245fb8]/50 via-[#245fb8]/30 via-40% to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-b from-[#163d7a]/30 via-[#163d7a]/12 to-transparent"></div>
            <div v-if="item.listing.badge" class="absolute top-3 left-3 bg-[#0b2343] text-white text-[10px] font-extrabold px-3 py-1 rounded-[10px] z-10 leading-none">
              {{ item.listing.badge }}
            </div>
            <button
              @click.stop="removeFromWishlist(item.listing.id)"
              class="absolute top-3 right-3 w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center z-10 hover:bg-red-50 transition-colors"
            >
              <Trash2 :size="18" class="text-[#e53935]" />
            </button>
            <div class="absolute bottom-0 left-0 w-full h-[10px] bg-[#ff5a1f]"></div>
          </div>
          <div class="px-4 pt-3 pb-2 flex flex-col flex-1">
            <p class="text-[13px] font-semibold text-[#59657b] leading-tight">
              {{ item.listing.location }} {{ item.listing.categoryName ? "• " + item.listing.categoryName : "" }}
            </p>
            <h3 class="mt-1 text-[15px] leading-[1.12] font-extrabold text-[#0b2343] line-clamp-3 min-h-[50px]">
              {{ item.listing.title }}
            </h3>
            <p class="mt-1 text-[13px] text-[#4f5b72] font-medium">
              {{ item.listing.duration }}
              <span v-if="item.listing.extras"> • {{ item.listing.extras }}</span>
            </p>
            <div class="mt-auto pt-2 flex items-end justify-between">
              <div class="flex items-center gap-1">
                <span class="text-[15px] font-bold text-[#0b2343]">{{ item.listing.rating }}</span>
                <Star :size="16" fill="currentColor" stroke-width="0" class="text-[#0b2343]" />
                <span class="text-[13px] text-[#6d788d] font-medium">({{ item.listing.reviews }})</span>
              </div>
              <div class="text-right leading-none">
                <p v-if="item.listing.oldPrice" class="text-[12px] text-[#8a94a6] line-through font-medium">
                  {{ currencyStore.formatPrice(item.listing.oldPrice) }}
                </p>
                <p class="text-[18px] font-extrabold text-[#e53935] mt-0.5">
                  {{ currencyStore.formatPrice(item.listing.price) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>
