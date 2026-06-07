<script setup>
import { ref } from "vue";
import { Star } from "lucide-vue-next";
import { useLocaleStore } from "../../stores/localeStore.js";
import { useAuthStore } from "../../stores/authStore.js";
import { createReview } from "../../api.js";

const localeStore = useLocaleStore();
const authStore = useAuthStore();

const props = defineProps({
  listingId: Number,
  rating: Number,
  reviewsCount: Number,
  reviewItems: { type: Array, default: () => [] },
});

const reviewText = ref("");
const reviewRating = ref(5);
const submitting = ref(false);
const submitted = ref(false);

const fallbackReviews = [
  { name: "Sarah M.", text: "Absolutely incredible experience! The guide was knowledgeable and the views were breathtaking.", rating: 5 },
  { name: "James K.", text: "Well organized and great value for money. Would definitely recommend to friends.", rating: 5 },
  { name: "Elena R.", text: "A highlight of our trip. The skip-the-line access saved us hours of waiting.", rating: 4 },
];

const displayReviews = computed(() => props.reviewItems.length > 0 ? props.reviewItems : fallbackReviews);

import { computed } from "vue";

async function handleSubmitReview() {
  if (!reviewText.value) return;
  submitting.value = true;
  try {
    await createReview(props.listingId, reviewRating.value, reviewText.value);
    submitted.value = true;
    reviewText.value = "";
  } catch (e) {
    console.error("Failed to submit review", e);
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div class="mt-16">
    <h2 class="text-[24px] font-bold tracking-[-0.3px] text-[#0b2343]">
      {{ localeStore.t("expReviews.title") }}
    </h2>

    <div class="mt-6 p-6 border border-gray-200 rounded-3xl">
      <div class="flex items-center gap-3">
        <span class="text-3xl font-black">{{ rating }}</span>
        <div class="flex gap-0.5">
          <Star v-for="i in 5" :key="i" :size="22" class="text-yellow-500 fill-yellow-500" :class="i > Math.round(rating) ? 'opacity-30' : ''" />
        </div>
      </div>
      <p class="mt-2 text-gray-500">{{ localeStore.t("expReviews.based", { n: reviewsCount }) }}</p>
    </div>

    <div class="mt-6 space-y-4">
      <div v-for="(review, i) in displayReviews" :key="i" class="p-5 border border-gray-200 rounded-2xl">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-[#0b2343] text-white flex items-center justify-center text-[13px] font-bold">
            {{ (review.name || "A").charAt(0) }}
          </div>
          <span class="font-semibold text-[14px] text-[#0b2343]">{{ review.name }}</span>
          <div class="flex gap-0.5 ml-2">
            <Star v-for="j in (review.rating || 5)" :key="j" :size="14" class="text-yellow-500 fill-yellow-500" />
          </div>
        </div>
        <p class="mt-2 text-[14px] text-gray-600 leading-relaxed">{{ review.text }}</p>
      </div>
    </div>

    <div v-if="submitted" class="mt-8 p-6 bg-green-50 border border-green-200 rounded-2xl text-center">
      <p class="text-[16px] font-semibold text-green-700">{{ localeStore.t("expReviews.thanks") }}</p>
    </div>

    <div v-else-if="authStore.isLoggedIn" class="mt-8 p-6 border border-gray-200 rounded-2xl">
      <h3 class="text-[18px] font-bold text-[#0b2343] mb-4">{{ localeStore.t("expReviews.write") }}</h3>
      <div class="mb-4">
        <label class="text-[13px] font-medium text-[#59657b] block mb-1">{{ localeStore.t("expReviews.ratingTitle") }}</label>
        <div class="flex gap-1">
          <button
            v-for="i in 5"
            :key="i"
            @click="reviewRating = i"
            type="button"
          >
            <Star :size="24" :class="i <= reviewRating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'" />
          </button>
        </div>
      </div>
      <textarea
        v-model="reviewText"
        :placeholder="localeStore.t('expReviews.textPlaceholder')"
        class="w-full px-4 py-3 border border-gray-200 rounded-xl text-[14px] text-[#0b2343] focus:outline-none focus:border-[#ff5533] resize-none"
        rows="4"
      ></textarea>
      <button
        @click="handleSubmitReview"
        :disabled="submitting || !reviewText"
        class="mt-3 bg-[#ff5533] text-white text-[14px] font-semibold px-6 py-2.5 rounded-full hover:bg-[#e6482a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ submitting ? "..." : localeStore.t("expReviews.submit") }}
      </button>
    </div>

    <div v-else class="mt-8 text-center p-6 border border-gray-200 rounded-2xl">
      <p class="text-[14px] text-gray-500">{{ localeStore.t("expReviews.login") }}</p>
    </div>
  </div>
</template>
